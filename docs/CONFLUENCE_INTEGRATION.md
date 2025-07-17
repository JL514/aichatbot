# Confluence Integration Guide

## CQL Query Syntax
- Example: `type=page and text~"walkthrough"`
- See [Confluence CQL docs](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/)
- Use keywords: walkthrough, vendor, documentation, guide, manual

## Authentication
- **Cloud:** Basic Auth (email + API token, base64 encoded)
- **Server/DC:** Username/password or PAT
- API endpoint: `/rest/api/content/search`

## Rate Limiting
- 429 Too Many Requests: Retry with backoff (see `src/confluenceClient.js`)
- Limit requests per minute as per Atlassian docs

## Permissions
- User must have permission to view spaces/pages being searched
- API token must be scoped appropriately

## Troubleshooting
- 401 Unauthorized: Check credentials and permissions
- 404 Not Found: Check base URL and endpoint
- 429 Rate Limit: Wait and retry

## Example Search Query
- Find vendor documentation: `type=page and text~"vendor documentation"`
- Find walkthroughs: `type=page and text~"walkthrough"`

## References
- [Confluence REST API](https://developer.atlassian.com/cloud/confluence/rest/)
- [CQL Reference](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/)
