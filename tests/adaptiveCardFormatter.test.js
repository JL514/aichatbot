const formatter = require('../src/adaptiveCardFormatter');
const fs = require('fs');

describe('adaptiveCardFormatter', () => {
  it('formats search results as Adaptive Card', () => {
    const results = [
      { title: 'Page 1', url: 'http://confluence/page1', summary: 'Summary 1', id: '1' },
      { title: 'Page 2', url: 'http://confluence/page2', summary: 'Summary 2', id: '2' }
    ];
    const card = formatter.formatSearchResults(results, 'test');
    expect(card.attachments[0].content.type).toBe('AdaptiveCard');
    expect(card.attachments[0].content.body[0].text).toContain('test');
  });

  it('formats error card', () => {
    const card = formatter.formatErrorCard('Error occurred', 'Try again');
    expect(card.attachments[0].content.body[0].text).toContain('Oops');
    expect(card.attachments[0].content.body[1].text).toBe('Error occurred');
  });
});
