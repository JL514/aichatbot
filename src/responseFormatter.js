function truncate(text, max = 300) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '...' : text;
}

function format(results) {
  if (!results || results.length === 0) {
    return 'No results found. Try different keywords or check your spelling.';
  }
  return results.map(r => `**${r.title}**\n${r.url}\n${truncate(r.excerpt, 200)}`).join('\n\n');
}

module.exports = { format };
