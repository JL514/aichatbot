const axios = require('axios');
const config = require('./config');
const logger = require('./utils/logger');
const { aiIntentToCql } = require('./utils/queryParser');
const { validateConfluence } = require('./validators/confluenceValidator');

const BASE_URL = config.confluence.baseUrl;
const AUTH = {
  username: config.confluence.email,
  password: config.confluence.apiToken
};

async function search(aiIntent, page = 1, pageSize = 5) {
  if (!aiIntent || typeof aiIntent !== 'object' || !aiIntent.query) {
    throw new Error('Invalid AI intent for Confluence search');
  }
  const cql = aiIntentToCql(aiIntent);
  if (!cql || typeof cql !== 'string' || cql.length > 500) {
    throw new Error('Invalid CQL for Confluence search');
  }
  const start = (page - 1) * pageSize;
  const url = `${BASE_URL}/rest/api/content/search?cql=${encodeURIComponent(cql)}&expand=title,excerpt,space,body.view,metadata.labels&start=${start}&limit=${pageSize}`;
  let attempts = 0;
  while (attempts < 3) {
    try {
      logger.logApiCall('confluence', { url, cql });
      const res = await axios.get(url, {
        auth: AUTH,
        headers: { 'Accept': 'application/json' }
      });
      // Validate response
      validateConfluence(res.data);
      return res.data.results.map(page => ({
        title: page.title,
        url: `${BASE_URL}${page._links.webui}`,
        excerpt: page.body?.view?.value || '',
        id: page.id
      }));
    } catch (err) {
      attempts++;
      if (err.response && err.response.status === 429 && attempts < 3) {
        logger.warn('Confluence rate limit hit, retrying...');
        await new Promise(r => setTimeout(r, 1000 * attempts));
      } else if (err.response && err.response.status === 401) {
        logger.logError(err);
        throw new Error('Confluence authentication failed. Check credentials.');
      } else {
        logger.logError(err);
        throw err;
      }
    }
  }
  return [];
}

module.exports = { search };
