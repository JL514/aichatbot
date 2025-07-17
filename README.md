# Teams Confluence Bot

A Microsoft Teams bot for searching Confluence walkthroughs and vendor information.

## Features
- Search Confluence for walkthroughs, vendor docs, and guides
- Simple keyword or natural language queries
- Plain text results with page links and excerpts
- Extensible for AI summarization and Adaptive Cards

## Prerequisites
- Node.js >= 18
- Microsoft Teams bot registration (Azure AD)
- Confluence Cloud or Server access with API token

## Installation
```sh
npm install
```

## Configuration
Copy `.env.example` to `.env` and fill in your credentials:
```
MicrosoftAppId=...
MicrosoftAppPassword=...
CONFLUENCE_BASE_URL=...
CONFLUENCE_EMAIL=...
CONFLUENCE_API_TOKEN=...
PORT=3978
```

## Local Development
- Start the bot:
  ```sh
  npm run start:dev
  ```
- Use [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator) for local testing
- For Teams integration, use [ngrok](https://ngrok.com/) to tunnel `/api/messages`

## Deployment
- Deploy to Azure App Service or your preferred Node.js host
- Set environment variables securely
- Register bot endpoint in Azure portal

## Testing
- Unit tests in `tests/` directory
- Run tests with:
  ```sh
  npm test
  ```

## Documentation
- [docs/SETUP.md](docs/SETUP.md): Teams & Confluence setup
- [docs/CONFLUENCE_INTEGRATION.md](docs/CONFLUENCE_INTEGRATION.md): API integration details

## Contributing
Pull requests welcome! See [CONTRIBUTING.md](docs/CONTRIBUTING.md) (if available).

## Future Enhancements
- AI summarization of Confluence pages
- Adaptive Card responses
- Support for more natural language queries

## License
MIT
