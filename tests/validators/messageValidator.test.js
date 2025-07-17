const { validateMessage, sanitizeText } = require('../../src/validators/messageValidator');

describe('messageValidator', () => {
  it('validates a correct message', () => {
    const msg = {
      text: 'hello',
      type: 'message',
      from: { id: 'user1' },
      conversation: { id: 'conv1' }
    };
    expect(validateMessage(msg)).toBeDefined();
  });

  it('throws on missing text', () => {
    expect(() => validateMessage({ type: 'message', from: { id: 'a' }, conversation: { id: 'b' } })).toThrow();
  });

  it('sanitizes text', () => {
    expect(sanitizeText('hello<script>')).toBe('helloscript');
    expect(sanitizeText("bad'quote")).toBe('badquote');
  });
});
