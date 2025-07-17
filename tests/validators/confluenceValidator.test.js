const { validateConfluence } = require('../../src/validators/confluenceValidator');

describe('confluenceValidator', () => {
  it('validates correct Confluence response', () => {
    const data = { results: [{ title: 't', url: 'http://a', excerpt: 'e', id: '1' }] };
    expect(validateConfluence(data)).toBe(data);
  });

  it('throws on invalid response', () => {
    expect(() => validateConfluence({})).toThrow();
  });
});
