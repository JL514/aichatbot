const { validateConfig } = require('../../src/validators/configValidator');

describe('configValidator', () => {
  it('validates correct config', () => {
    const env = {
      MicrosoftAppId: '123e4567-e89b-12d3-a456-426614174000',
      MicrosoftAppPassword: 'password123',
      CONFLUENCE_BASE_URL: 'https://example.atlassian.net/wiki',
      CONFLUENCE_EMAIL: 'user@example.com',
      CONFLUENCE_API_TOKEN: 'token1234567890',
      OPENAI_API_KEY: 'sk-12345678901234567890',
      OPENAI_MODEL: 'gpt-3.5-turbo',
      NODE_ENV: 'development',
      LOG_LEVEL: 'info',
      PORT: 3978
    };
    expect(validateConfig(env)).toBeDefined();
  });

  it('throws on missing required config', () => {
    expect(() => validateConfig({})).toThrow(/Config validation error/);
  });
});
