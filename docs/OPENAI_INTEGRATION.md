# OpenAI Integration Guide

## Overview
This bot uses OpenAI's GPT models to interpret user questions and summarize Confluence content for Microsoft Teams. The integration enables:
- Natural language understanding of user queries
- Extraction of search intent and keywords
- Summarization of Confluence page content

## Prompt Engineering
- Prompts are stored in `templates/prompts/`
- `questionInterpretation.txt`: Guides the model to extract type, keywords, and CQL query as JSON
- `contentSummarization.txt`: Guides the model to summarize Confluence content concisely for Teams
- You can customize these prompts for your use case

## Model Selection
- Default: `gpt-3.5-turbo` (configurable via `OPENAI_MODEL`)
- For higher accuracy, use `gpt-4` (higher cost)

## Cost Management
- Use caching (`src/utils/cacheManager.js`) to avoid repeated API calls for similar queries
- Monitor token usage in logs
- Set sensible max_tokens and temperature in config

## Error Handling
- Handles API rate limits and network errors
- Fallbacks to keyword parsing if OpenAI is unavailable

## Example Prompts
### Question Interpretation
```
User question: How do I set up SSO for vendor X?
Response: {"type": "vendor", "keywords": ["SSO", "vendor X"], "query": "type=page and text~\"SSO vendor X\""}
```

### Content Summarization
```
Content: This page describes how to set up SSO for vendor X...
Summary: To set up SSO for vendor X, follow these main steps: ...
```

## Troubleshooting
- Check logs for OpenAI errors or token usage
- Ensure `OPENAI_API_KEY` is set and valid
- Adjust prompts for better results

## References
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
