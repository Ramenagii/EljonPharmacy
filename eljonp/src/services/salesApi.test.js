import { describe, expect, it } from 'vitest';
import {
  calculateItemsTotal,
  normalizeItems,
  parsePrice,
  roundMoney,
} from './salesApi';

describe('sales helpers', () => {
  it('parses peso-formatted prices into numbers', () => {
    expect(parsePrice('PHP 1,234.50')).toBe(1234.5);
    expect(parsePrice('₱89')).toBe(89);
    expect(parsePrice('free')).toBe(0);
  });

  it('rounds money to two decimal places', () => {
    expect(roundMoney(0.1 + 0.2)).toBe(0.3);
    expect(roundMoney('12.345')).toBe(12.35);
  });

  it('normalizes line items and removes blank names', () => {
    expect(
      normalizeItems([
        { name: '  Paracetamol  ', quantity: '2', unitPrice: '5.555' },
        { name: '   ', quantity: 10, unitPrice: 99 },
      ]),
    ).toEqual([
      {
        name: 'Paracetamol',
        quantity: 2,
        unitPrice: 5.56,
        lineTotal: 11.12,
      },
    ]);
  });

  it('calculates item totals from normalized sale rows', () => {
    expect(
      calculateItemsTotal([
        { quantity: 2, unitPrice: 5.5 },
        { quantity: 3, unitPrice: 7.25 },
      ]),
    ).toBe(32.75);
  });
});
