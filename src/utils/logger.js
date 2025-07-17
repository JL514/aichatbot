const levels = ['error', 'warn', 'info', 'debug'];
const level = process.env.LOG_LEVEL || 'info';
const { v4: uuidv4 } = require('uuid');

function getCorrelationId() {
  if (!global._correlationId) global._correlationId = uuidv4();
  return global._correlationId;
}

function validateLogArgs(args) {
  return args.map((a) => (typeof a === 'string' ? a.replace(/[\r\n]/g, ' ') : a));
}

function log(lvl, ...args) {
  if (levels.indexOf(lvl) <= levels.indexOf(level)) {
    const ts = new Date().toISOString();
    const cid = getCorrelationId();
    const safeArgs = validateLogArgs(args);
    console[lvl === 'error' ? 'error' : 'log'](`[${ts}] [${lvl.toUpperCase()}] [CID:${cid}]`, ...safeArgs);
  }
}

function logApiCall(api, details) {
  log('info', `[API:${api}]`, details);
}

function logTokenUsage(api, usage) {
  log('info', `[API:${api}][TOKENS]`, usage);
}

function logError(err, context = {}) {
  log('error', err.message, { stack: err.stack, ...context });
}

// Placeholder for log rotation (production: use winston or pino with rotation)

module.exports = {
  error: (...args) => log('error', ...args),
  warn: (...args) => log('warn', ...args),
  info: (...args) => log('info', ...args),
  debug: (...args) => log('debug', ...args),
  logApiCall,
  logTokenUsage,
  getCorrelationId,
  logError
};
