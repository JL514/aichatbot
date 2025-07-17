const Ajv = require('ajv');
const ajv = new Ajv();
const cardSchema = require('../../schemas/adaptive-card.schema.json');

const validateCard = ajv.compile(cardSchema);

function validateAdaptiveCard(card) {
  const valid = validateCard(card);
  if (!valid) {
    throw new Error('Adaptive Card validation error: ' + JSON.stringify(validateCard.errors));
  }
  return card;
}

module.exports = { validateAdaptiveCard };
