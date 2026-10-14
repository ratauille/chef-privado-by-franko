import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuote } from './src/lib/quoteCalculator.ts';

test('AI Studio formula: premium villa in Puerto Vallarta', () => {
  const quote = calculateQuote({ guests: 4, packageType: 'premium', location: 'pv', service: 'villa' });
  assert.equal(quote.subtotal, 720);
  assert.equal(quote.iva, 115.2);
  assert.equal(quote.serviceFee, 129.6);
  assert.ok(Math.abs(quote.total - 964.8) < 1e-9);
});

test('AI Studio formula: location fee and service multiplier', () => {
  const quote = calculateQuote({ guests: 10, packageType: 'standard', location: 'pm', service: 'wedding' });
  assert.equal(quote.subtotal, 1675);
  assert.equal(quote.total, 2244.5);
});

test('AI Studio clamps guests to the original 1..500 range', () => {
  assert.equal(calculateQuote({ guests: 0, packageType: 'gold', location: 'pv', service: 'villa' }).guests, 1);
  assert.equal(calculateQuote({ guests: 999, packageType: 'gold', location: 'pv', service: 'villa' }).guests, 500);
});
