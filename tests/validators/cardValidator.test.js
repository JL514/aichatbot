const { validateAdaptiveCard } = require('../../src/validators/cardValidator');

describe('cardValidator', () => {
  it('validates correct card', () => {
    const card = { type: 'AdaptiveCard', version: '1.5', body: [] };
    expect(validateAdaptiveCard(card)).toBe(card);
  });

  it('throws on invalid card', () => {
    expect(() => validateAdaptiveCard({})).toThrow();
  });
});
