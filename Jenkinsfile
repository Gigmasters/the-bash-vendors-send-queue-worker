REPO_NAME = 'the-bash-vendors-send-queue-worker'
CHANNEL = '#bash-bots'
XO_HELM_TAG = env.BRANCH_NAME == 'main' ? 'prod' : 'preprod'
ALLOWLIST_REQUIRED_ENVIRONMENTS = ['garage', 'matrix', 'konoha', 'liquid', 'playground', 'spot']

def notifySlack(result, durationString) {
  def elapsedTime = durationString.replace(' and counting', '')
  def slackColor = result == 'SUCCESS' ? 'good' : 'danger'

  slackSend(
    color: slackColor,
    message: "$REPO_NAME ($BRANCH_NAME) - $result after $elapsedTime (<$BUILD_URL|$BUILD_DISPLAY_NAME>)",
    channel: "$CHANNEL"
  )
}

def getDeployCluster() {
    if ("$BRANCH_NAME" == "main") {
        return "production"
    } else{
        return "qa"
    }
}

pipeline {
  agent {
    kubernetes {
      label REPO_NAME
      yaml """
      kind: Pod
      metadata:
        name: ${REPO_NAME}
      spec:
        imagePullSecrets:
          - name: regcred
        containers:
        - name: docker
          image: docker:19.03.8
          imagePullPolicy: Always
          tty: true
          volumeMounts:
          - name: docker-sock-volume
            mountPath: /var/run/docker.sock
        - name: xo-helm
          image: xogroup/xo-helm:${XO_HELM_TAG}
          imagePullPolicy: Always
          tty: true
          command:
            - cat
        - name: xo-helm-exec
          image: xogroup/xo-helm:exec
          imagePullPolicy: Always
          tty: true
          command:
            - cat
        - name: pgtest
          image: postgres:12.4
          env:
          - name: POSTGRES_DB
            value: thebash
          - name: POSTGRES_USER
            value: bash_api
          - name: POSTGRES_PASSWORD
            value: password
        - name: service
          tty: true
          image: node:14.15.1-slim
          volumeMounts:
            - name: docker-sock-volume
              mountPath: /var/run/docker.sock
        volumes:
        - name: docker-sock-volume
          hostPath:
            path: /var/run/docker.sock
        hostAliases:
          - ip: "127.0.0.1"
            hostnames:
            - "pgtest"
        """
    }
  }

  environment {
    isUserTrigger = "${!!currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause').length}"
    VERSION = sh(returnStdout: true, script:'git rev-parse HEAD').trim()
    IMAGE_NAME = "xogroup/${REPO_NAME}:$VERSION"
    KUBERNETES_ENV = sh(returnStdout: true,
      script:'''#!/bin/bash
          if [[ "$BRANCH_NAME" == "develop" ]]; then
            echo "qa"
          elif [[ "$BRANCH_NAME" == "main" ]]; then
            echo "production"
          else
            echo $BRANCH_NAME
          fi
      '''
    ).trim()
    DEPLOY_CLUSTER = getDeployCluster()
    TAG = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
  }

  stages {
    stage('Start to deploy') {
      when { anyOf {
        branch 'develop';
        branch 'main';
        branch 'playground';
        branch 'garage';
        branch 'matrix';
        branch 'spot';
        branch 'konoha';
        branch 'liquid';
        branch 'sandbox';
      } }
      steps{
        slackSend(
          message: "$REPO_NAME ($BRANCH_NAME) - Job Started (<$BUILD_URL|$BUILD_DISPLAY_NAME>)",
          channel: "$CHANNEL"
        )
      }
    }

    stage("Deploy Approval") {
      when { anyOf { branch 'main' } }
      agent none
      steps {
        timeout(time:1, unit:'HOURS') {
          input message: 'Deploy to production?'
        }
      }
    }

    stage('Deploy') {
      stages {
        stage('Build Docker Image') {
          steps {
            container('docker') {
              sh """
              apk add make git curl gettext
              make build env=$KUBERNETES_ENV
              """
            }
          }
        }

        stage('Push Docker Image') {
          when { anyOf {
            branch 'develop';
            branch 'main';
            branch 'playground';
            branch 'garage';
            branch 'matrix';
            branch 'spot';
            branch 'konoha';
            branch 'liquid';
            branch 'sandbox';
          } }
          steps{
            container('docker'){
              withCredentials([
                usernamePassword(credentialsId:'bash-docker-hub', usernameVariable:'DOCKER_USERNAME', passwordVariable:'DOCKER_PASSWORD')
              ]){
                sh """
                make push env=$KUBERNETES_ENV
                """
              }
            }
          }
        }

        stage('Deploy to Eks') {
          when { anyOf {
            branch 'develop';
            branch 'main';
            branch 'playground';
            branch 'garage';
            branch 'matrix';
            branch 'spot';
            branch 'konoha';
            branch 'liquid';
            branch 'sandbox';
          } }
          steps{
            container('docker') {
              withCredentials([
                  string(credentialsId:'bash-pg-password', variable:'PG_PASSWORD')
              ]){
              script {
                setHelmEnvVariables = [
                  "--set env[0].name=NODE_ENV,env[0].value=${KUBERNETES_ENV}",
                  "--set env[1].name=PG_PASSWORD,env[1].value=$PG_PASSWORD",
                  "--set image.tag=${TAG}"
                ]
                deploy_image_tag = "${TAG}"
                kopsAllowList = ALLOWLIST_REQUIRED_ENVIRONMENTS.contains(KUBERNETES_ENV) ? "--set scheduleOnWhitelist.enabled=true" : ''
              }
              k8sDeployEks(application: "${REPO_NAME}",
                namespace: 'thebash',
                imageTag: deploy_image_tag,
                environment: "${KUBERNETES_ENV}",
                wait: true,
                deployContainer: "xo-helm-exec",
                clusterEnv: "${DEPLOY_CLUSTER}",
                additionalHelmParameters: setHelmEnvVariables)
              }
            }
          }
        }
      }
    }
  }

  post {
    always {
      notifySlack(currentBuild.currentResult, currentBuild.durationString)
    }
  }
}
