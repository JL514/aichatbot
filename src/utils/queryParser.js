const keywords = ['walkthrough', 'vendor', 'documentation', 'guide', 'manual', 'how-to'];
const { sanitizeText } = require('../validators/messageValidator');

function parse(text) {
  if (!text || typeof text !== 'string' || text.length > 1000) return null;
  const lower = text.toLowerCase();
  for (const kw of keywords) {
    if (lower.includes(kw)) {
      const idx = lower.indexOf(kw);
      const after = text.slice(idx + kw.length).trim();
      return sanitizeText(after || kw);
    }
  }
  return sanitizeText(text.trim());
}

function aiIntentToCql(aiIntent) {
  if (!aiIntent || !aiIntent.query) return '';
  // If already a CQL, return as is
  if (aiIntent.query.includes('type=') && aiIntent.query.includes('text~')) return aiIntent.query;
  // Otherwise, build a simple CQL
  return `type=page and text~"${sanitizeText(aiIntent.query)}"`;
}

module.exports = { parse, aiIntentToCql, sanitize: sanitizeText };
