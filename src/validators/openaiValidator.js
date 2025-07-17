const Ajv = require('ajv');
const ajv = new Ajv();
const openaiSchema = require('../../schemas/openai-response.schema.json');

const validateOpenAIResponse = ajv.compile(openaiSchema);

function validateAIResponse(data) {
  const valid = validateOpenAIResponse(data);
  if (!valid) {
    throw new Error('OpenAI response validation error: ' + JSON.stringify(validateOpenAIResponse.errors));
  }
  return data;
}

module.exports = { validateAIResponse };
