require('dotenv').config();

function requireEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return process.env[name];
}

const config = {
  bot: {
    appId: requireEnv('MicrosoftAppId'),
    appPassword: requireEnv('MicrosoftAppPassword')
  },
  confluence: {
    baseUrl: requireEnv('CONFLUENCE_BASE_URL'),
    email: requireEnv('CONFLUENCE_EMAIL'),
    apiToken: requireEnv('CONFLUENCE_API_TOKEN')
  },
  openai: {
    apiKey: requireEnv('OPENAI_API_KEY'),
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    temperature: process.env.OPENAI_TEMPERATURE ? parseFloat(process.env.OPENAI_TEMPERATURE) : 0.2
  },
  app: {
    port: process.env.PORT || 3978,
    logLevel: process.env.LOG_LEVEL || 'info'
  }
};

module.exports = config;
