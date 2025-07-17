require('dotenv').config();
const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { TeamsActivityHandler, CloudAdapter } = require('botbuilder-teams');
const config = require('./src/config');
const logger = require('./src/utils/logger');
const Bot = require('./src/bot');
const { validateMessage } = require('./src/validators/messageValidator');
const { handleError } = require('./src/utils/errorHandler');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const port = config.app.port;
server.listen(port, () => {
  logger.info(`\nBot Started, listening on port ${port}`);
});

const adapter = new BotFrameworkAdapter({
  appId: config.bot.appId,
  appPassword: config.bot.appPassword
});

adapter.onTurnError = async (context, error) => {
  logger.logError(error);
  const adaptiveCardFormatter = require('./src/adaptiveCardFormatter');
  const errObj = handleError(error);
  const errorCard = adaptiveCardFormatter.formatErrorCard(errObj.userMessage, errObj.details || 'Try again or contact support.');
  await context.sendActivity(errorCard);
};

const bot = new Bot();

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    try {
      // Validate incoming message
      validateMessage(context.activity);
      await bot.run(context);
    } catch (err) {
      logger.logError(err);
      const adaptiveCardFormatter = require('./src/adaptiveCardFormatter');
      const errObj = handleError(err);
      const errorCard = adaptiveCardFormatter.formatErrorCard(errObj.userMessage, errObj.details || 'Try again or contact support.');
      await context.sendActivity(errorCard);
    }
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down server.');
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down server.');
  server.close(() => process.exit(0));
});
