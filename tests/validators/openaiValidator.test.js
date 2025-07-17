const { validateAIResponse } = require('../../src/validators/openaiValidator');

describe('openaiValidator', () => {
  it('validates correct OpenAI response', () => {
    const data = { type: 'walkthrough', keywords: ['foo'], query: 'type=page and text~"foo"' };
    expect(validateAIResponse(data)).toBe(data);
  });

  it('throws on invalid response', () => {
    expect(() => validateAIResponse({})).toThrow();
  });
});
