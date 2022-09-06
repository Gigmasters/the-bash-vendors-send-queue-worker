'use strict';

const converter = require('../../../src/utils/converter');

describe('src/utils/converter: ', () => {
  describe('#objectSnakeToCamelCase', () => {
    it('converts object properties where appropriate', () => {
      const original = {
        simple: 'random value',
        two_words: 'test 231351',
        long_string_with_multiple_words: '8asdhfahsdfhuf2',
      };
      const converted = converter.objectSnakeToCamelCase(original);

      expect(converted).toEqual({
        simple: 'random value',
        twoWords: 'test 231351',
        longStringWithMultipleWords: '8asdhfahsdfhuf2',
      });
    });
  });

  describe('stringCamelToSnakeCase', () => {
    it('does not change simple one word case', () => {
      const converted = converter.stringCamelToSnakeCase('simple');
      expect(converted).toEqual('simple');
    });

    it('does change simple two word case', () => {
      const converted = converter.stringCamelToSnakeCase('simpleOne');
      expect(converted).toEqual('simple_one');
    });

    it('does change simple long case', () => {
      const converted = converter.stringCamelToSnakeCase('longStringWithMultipleWords');
      expect(converted).toEqual('long_string_with_multiple_words');
    });
  });

  describe('stringSnakeToCamelCase', () => {
    it('does not change simple one word case', () => {
      const converted = converter.stringSnakeToCamelCase('simple');
      expect(converted).toEqual('simple');
    });

    it('does change simple two word case', () => {
      const converted = converter.stringSnakeToCamelCase('simple_one');
      expect(converted).toEqual('simpleOne');
    });

    it('does change simple long case', () => {
      const converted = converter.stringSnakeToCamelCase('long_string_with_multiple_words');
      expect(converted).toEqual('longStringWithMultipleWords');
    });
  });
});
