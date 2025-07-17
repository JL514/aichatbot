const { Configuration, OpenAIApi } = require('openai');
const config = require('./config');
const logger = require('./utils/logger');
const cache = require('./utils/cacheManager');
const fs = require('fs');
const path = require('path');
const { validateAIResponse } = require('./validators/openaiValidator');
const { sanitizeText } = require('./validators/messageValidator');

const openai = new OpenAIApi(new Configuration({ apiKey: config.openai.apiKey }));

function loadPromptTemplate(filename) {
  return fs.readFileSync(path.join(__dirname, '../templates/prompts', filename), 'utf8');
}

async function interpretQuestion(question) {
  if (!question || typeof question !== 'string' || question.length > 1000) {
    throw new Error('Invalid question for OpenAI');
  }
  const cacheKey = `interpret:${sanitizeText(question)}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  const prompt = loadPromptTemplate('questionInterpretation.txt').replace('{{question}}', question);
  try {
    const res = await openai.createChatCompletion({
      model: config.openai.model,
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 256,
      temperature: 0.2
    });
    const answer = res.data.choices[0].message.content;
    let parsed;
    try {
      parsed = JSON.parse(answer);
      validateAIResponse(parsed);
    } catch (e) {
      logger.warn('OpenAI interpret response failed validation or parse:', e);
      throw new Error('OpenAI interpret response invalid format');
    }
    cache.set(cacheKey, answer);
    logger.logTokenUsage('openai', res.data.usage);
    return answer;
  } catch (err) {
    logger.logError(err);
    throw err;
  }
}

async function summarizeContent(content) {
  if (!content || typeof content !== 'string' || content.length > 5000) {
    throw new Error('Invalid content for summarization');
  }
  const cacheKey = `summary:${sanitizeText(content.slice(0,100))}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  const prompt = loadPromptTemplate('contentSummarization.txt').replace('{{content}}', content);
  try {
    const res = await openai.createChatCompletion({
      model: config.openai.model,
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 256,
      temperature: 0.3
    });
    const summary = res.data.choices[0].message.content;
    if (!summary || summary.length < 5) throw new Error('OpenAI summary too short');
    cache.set(cacheKey, summary);
    logger.logTokenUsage('openai', res.data.usage);
    return summary;
  } catch (err) {
    logger.logError(err);
    throw err;
  }
}

module.exports = { interpretQuestion, summarizeContent };
