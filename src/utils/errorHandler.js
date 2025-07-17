const logger = require('./logger');

function handleError(err, context = {}) {
  const isValidation = err.message && err.message.toLowerCase().includes('validation');
  logger.error('Error:', err.message, { stack: err.stack, ...context });
  if (isValidation) {
    return {
      userMessage: 'There was a problem with your input. Please check and try again.',
      details: err.message
    };
  }
  return {
    userMessage: 'An unexpected error occurred. Please try again later.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  };
}

module.exports = { handleError };
