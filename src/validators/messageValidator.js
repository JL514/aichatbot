const Joi = require('joi');

const messageSchema = Joi.object({
  text: Joi.string().min(1).max(1000).required(),
  type: Joi.string().valid('message').required(),
  from: Joi.object({ id: Joi.string().required() }).required(),
  conversation: Joi.object({ id: Joi.string().required() }).required()
});

function validateMessage(msg) {
  const { error, value } = messageSchema.validate(msg, { abortEarly: false });
  if (error) {
    throw new Error('Message validation error: ' + error.details.map((d) => d.message).join(', '));
  }
  return value;
}

function sanitizeText(text) {
  return text.replace(/[<>"'\\]/g, '');
}

module.exports = { validateMessage, sanitizeText };
