
import { describe, expect, test } from '@jest/globals';
import { areSameStrings, isArrayEmpty, isNumberDecimal, isNumberNegative, isStrictlyNaN, isStringEmpty } from '../src/utils';

describe('utils', () => {
  test('areSameStrings', () => {
    expect(areSameStrings('a', 'a', 'a')).toBe(true);
    expect(areSameStrings('a', 'a', 'b')).toBe(false);
    expect(areSameStrings('a', 'b', 'a')).toBe(false);
    expect(areSameStrings('a', 'b', 'c')).toBe(false);
  });

  test('isArrayEmpty', () => {
      expect(isArrayEmpty([])).toBe(true);
      expect(isArrayEmpty([1])).toBe(false);
      expect(isArrayEmpty([1, 2])).toBe(false);
  });

  test('isNumberDecimal', () => {
    expect(isNumberDecimal(1)).toBe(false);
    expect(isNumberDecimal(1.1)).toBe(true);
    expect(isNumberDecimal(1.11)).toBe(true);
    expect(isNumberDecimal(1.111)).toBe(true);
    expect(isNumberDecimal(-1)).toBe(false);
    expect(isNumberDecimal(-1.1)).toBe(true);
    expect(isNumberDecimal(-1.11)).toBe(true);
    expect(isNumberDecimal(-1.111)).toBe(true);

  });

  test('isNumberNegative', () => {
    expect(isNumberNegative(0)).toBe(false);
    expect(isNumberNegative(1)).toBe(false);
    expect(isNumberNegative(-1)).toBe(true);
  });

  test('isStrictlyNaN', () => {
    expect(isStrictlyNaN(0)).toBe(false);
    expect(isStrictlyNaN(1)).toBe(false);
    expect(isStrictlyNaN(-1)).toBe(false);
    expect(isStrictlyNaN(NaN)).toBe(true);
    expect(isStrictlyNaN('a')).toBe(true);
  });

  test('isStringEmpty', () => {
    expect(isStringEmpty('')).toBe(true);
    expect(isStringEmpty(' ')).toBe(true);
    expect(isStringEmpty('a')).toBe(false);
  });
});