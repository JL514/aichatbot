const { Application, DefaultTurnState, TeamsAdapter } = require('@microsoft/teams-ai');
const openaiClient = require('./openaiClient');
const confluenceClient = require('./confluenceClient');
const adaptiveCardFormatter = require('./adaptiveCardFormatter');
const queryParser = require('./utils/queryParser');
const logger = require('./utils/logger');
const { validateMessage } = require('./validators/messageValidator');
const { handleError } = require('./utils/errorHandler');


// TeamsAdapter and Application setup for @microsoft/teams-ai
const adapter = new TeamsAdapter({
  // ...adapter config (appId, password, etc.)
});

const app = new Application({
  adapter,
  // ...other Application config
});

app.message(async (context, state) => {
  const userText = context.activity.text || '';
  logger.info(`Received message: ${userText}`);
  try {
    // Validate message
    validateMessage(context.activity);
    // Use OpenAI to interpret the question
    let aiIntent;
    try {
      const aiRaw = await openaiClient.interpretQuestion(userText);
      aiIntent = JSON.parse(aiRaw);
    } catch (aiErr) {
      logger.warn('OpenAI unavailable or failed, falling back to keyword parsing.');
      aiIntent = { query: queryParser.parse(userText), type: 'general', keywords: [] };
    }
    if (!aiIntent || !aiIntent.query) {
      const errorCard = adaptiveCardFormatter.formatErrorCard('Please specify what you want to search for in Confluence.', 'Try asking about a walkthrough or vendor.');
      await context.sendActivity(errorCard);
      return;
    }
    // Search Confluence
    const results = await confluenceClient.search(aiIntent);
    // Optionally summarize content with OpenAI
    for (const r of results) {
      try {
        r.summary = await openaiClient.summarizeContent(r.excerpt);
      } catch (summErr) {
        r.summary = r.excerpt;
      }
    }
    // Format as Adaptive Card
    const card = adaptiveCardFormatter.formatSearchResults(results, aiIntent.query);
    await context.sendActivity(card);
  } catch (err) {
    logger.logError(err);
    const errObj = handleError(err);
    const errorCard = adaptiveCardFormatter.formatErrorCard(errObj.userMessage, errObj.details || 'Please try again later or contact support.');
    await context.sendActivity(errorCard);
  }
});

module.exports = app;
