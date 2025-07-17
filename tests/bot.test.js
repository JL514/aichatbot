const Bot = require('../src/bot');
const confluenceClient = require('../src/confluenceClient');
const openaiClient = require('../src/openaiClient');
const adaptiveCardFormatter = require('../src/adaptiveCardFormatter');

jest.mock('../src/confluenceClient');
jest.mock('../src/openaiClient');
jest.mock('../src/adaptiveCardFormatter');

describe('Bot', () => {
  let bot, context;

  beforeEach(() => {
    bot = new Bot();
    context = {
      activity: { text: 'search walkthrough' },
      sendActivity: jest.fn()
    };
    openaiClient.interpretQuestion.mockResolvedValue('{"type":"walkthrough","keywords":["walkthrough"],"query":"type=page and text~\"walkthrough\""}');
    openaiClient.summarizeContent.mockResolvedValue('summary');
    adaptiveCardFormatter.formatSearchResults.mockReturnValue({ attachments: [{ content: { type: 'AdaptiveCard' } }] });
    adaptiveCardFormatter.formatErrorCard.mockReturnValue({ attachments: [{ content: { type: 'AdaptiveCard', body: [{ text: 'Oops' }] } }] });
  });

  it('sends Adaptive Card for valid query', async () => {
    confluenceClient.search.mockResolvedValue([{ title: 'Walkthrough', url: 'url', excerpt: 'desc', id: '1' }]);
    await bot.onMessage(context, jest.fn());
    expect(context.sendActivity).toHaveBeenCalledWith(expect.objectContaining({ attachments: expect.any(Array) }));
  });

  it('handles missing query', async () => {
    openaiClient.interpretQuestion.mockResolvedValue('{}');
    await bot.onMessage(context, jest.fn());
    expect(context.sendActivity).toHaveBeenCalledWith(expect.objectContaining({ attachments: expect.any(Array) }));
  });

  it('handles errors gracefully', async () => {
    confluenceClient.search.mockRejectedValue(new Error('fail'));
    await bot.onMessage(context, jest.fn());
    expect(context.sendActivity).toHaveBeenCalledWith(expect.objectContaining({ attachments: expect.any(Array) }));
  });
});
