const Ajv = require('ajv');
const ajv = new Ajv();
const confluenceSchema = require('../../schemas/confluence-response.schema.json');

const validateConfluenceResponse = ajv.compile(confluenceSchema);

function validateConfluence(data) {
  const valid = validateConfluenceResponse(data);
  if (!valid) {
    throw new Error('Confluence response validation error: ' + JSON.stringify(validateConfluenceResponse.errors));
  }
  return data;
}

module.exports = { validateConfluence };
