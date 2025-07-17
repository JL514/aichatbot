const openaiClient = require('../src/openaiClient');
const cache = require('../src/utils/cacheManager');

jest.mock('openai', () => {
  return {
    Configuration: jest.fn(),
    OpenAIApi: jest.fn().mockImplementation(() => ({
      createChatCompletion: jest.fn(({ messages }) => {
        if (messages[0].content.includes('fail')) throw new Error('API error');
        if (messages[0].content.includes('walkthrough')) {
          return Promise.resolve({
            data: {
              choices: [{ message: { content: '{"type":"walkthrough","keywords":["setup"],"query":"type=page and text~\"setup walkthrough\""}' } }],
              usage: { total_tokens: 42 }
            }
          });
        }
        return Promise.resolve({
          data: {
            choices: [{ message: { content: 'summary' } }],
            usage: { total_tokens: 10 }
          }
        });
      })
    }))
  };
});

describe('openaiClient', () => {
  afterEach(() => cache.clear());

  it('interprets question and returns JSON', async () => {
    const result = await openaiClient.interpretQuestion('How do I setup a walkthrough?');
    expect(result).toContain('walkthrough');
  });

  it('summarizes content', async () => {
    const result = await openaiClient.summarizeContent('Some content');
    expect(result).toBe('summary');
  });

  it('caches results', async () => {
    await openaiClient.summarizeContent('Some content');
    const cached = cache.get('summary:Some content');
    expect(cached).toBe('summary');
  });

  it('handles API errors', async () => {
    await expect(openaiClient.interpretQuestion('fail')).rejects.toThrow('API error');
  });
});
