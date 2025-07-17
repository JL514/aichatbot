const fs = require('fs');
const path = require('path');
const ACData = require('adaptivecards-templating');
const { validateAdaptiveCard } = require('./validators/cardValidator');
const { sanitizeText } = require('./validators/messageValidator');

function loadTemplate(name) {
  const file = path.join(__dirname, '../templates/adaptiveCards', name);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function formatSearchResults(results, query, page = 1, pageSize = 3) {
  const template = loadTemplate('searchResults.json');
  const paged = results.slice((page-1)*pageSize, page*pageSize);
  const data = {
    query: sanitizeText(query),
    results: paged.map(r => ({
      title: sanitizeText(r.title),
      url: r.url,
      summary: sanitizeText(r.summary || r.excerpt || ''),
      id: r.id
    })),
    hasMore: results.length > page*pageSize,
    page,
    pageSize
  };
  const card = new ACData.Template(template).expand({ $root: data });
  validateAdaptiveCard(card);
  return { attachments: [{ contentType: 'application/vnd.microsoft.card.adaptive', content: card }] };
}

function formatErrorCard(message, suggestion) {
  const template = loadTemplate('errorCard.json');
  const data = { message: sanitizeText(message), suggestion: sanitizeText(suggestion) };
  const card = new ACData.Template(template).expand({ $root: data });
  validateAdaptiveCard(card);
  return { attachments: [{ contentType: 'application/vnd.microsoft.card.adaptive', content: card }] };
}

module.exports = { formatSearchResults, formatErrorCard };
