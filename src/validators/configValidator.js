const Joi = require('joi');

const configSchema = Joi.object({
  MicrosoftAppId: Joi.string().guid({ version: 'uuidv4' }).required(),
  MicrosoftAppPassword: Joi.string().min(8).required(),
  CONFLUENCE_BASE_URL: Joi.string().uri().required(),
  CONFLUENCE_EMAIL: Joi.string().email().required(),
  CONFLUENCE_API_TOKEN: Joi.string().min(10).required(),
  OPENAI_API_KEY: Joi.string().min(20).required(),
  OPENAI_MODEL: Joi.string().valid('gpt-3.5-turbo', 'gpt-4').default('gpt-3.5-turbo'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
  PORT: Joi.number().integer().min(1024).max(65535).default(3978)
});

function validateConfig(env) {
  const { error, value } = configSchema.validate(env, { abortEarly: false });
  if (error) {
    throw new Error('Config validation error: ' + error.details.map((d) => d.message).join(', '));
  }
  return value;
}

module.exports = { validateConfig };
