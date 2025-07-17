const confluenceClient = require('../src/confluenceClient');
const axios = require('axios');
jest.mock('axios');

describe('confluenceClient', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns search results for valid AI intent', async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { title: 'Walkthrough', _links: { webui: '/page/1' }, body: { view: { value: 'Content' } }, id: '1' }
        ]
      }
    });
    const aiIntent = { query: 'type=page and text~"walkthrough"' };
    const results = await confluenceClient.search(aiIntent, 1, 1);
    expect(results[0].title).toBe('Walkthrough');
    expect(results[0].url).toContain('/page/1');
  });

  it('handles empty results', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });
    const aiIntent = { query: 'type=page and text~"noresults"' };
    const results = await confluenceClient.search(aiIntent);
    expect(results).toEqual([]);
  });

  it('retries on 429 rate limit', async () => {
    axios.get
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockResolvedValueOnce({ data: { results: [] } });
    const aiIntent = { query: 'type=page and text~"rate"' };
    const results = await confluenceClient.search(aiIntent);
    expect(results).toEqual([]);
  });

  it('throws on other errors', async () => {
    axios.get.mockRejectedValue({ response: { status: 500 } });
    const aiIntent = { query: 'type=page and text~"fail"' };
    await expect(confluenceClient.search(aiIntent)).rejects.toBeTruthy();
  });
});
