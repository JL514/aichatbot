# Setup Guide: Teams Confluence Bot

## 1. Register Your Bot in Azure
- Go to [Azure Portal](https://portal.azure.com/)
- Register a new Azure Bot resource
- Note the MicrosoftAppId and MicrosoftAppPassword
- Enable Microsoft Teams channel

## 2. Generate Confluence API Token
- For Confluence Cloud: [Atlassian API tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
- For Server/DC: Use username/password or personal access token
- Ensure your user has permission to search/view required spaces

## 3. Local Development
- Clone the repo and run `npm install`
- Copy `.env.example` to `.env` and fill in credentials
- Start the bot: `npm run start:dev`
- Use [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator) for local testing
- For Teams, use [ngrok](https://ngrok.com/) to tunnel your local port (e.g. `ngrok http 3978`)
- Set the messaging endpoint in Azure to `https://<ngrok-id>.ngrok.io/api/messages`

## 4. Deployment
- Deploy to Azure App Service or similar Node.js host
- Set environment variables securely in your hosting environment
- Update the bot endpoint in Azure

## 5. Security Best Practices
- Never commit `.env` or credentials to source control
- Use Azure Key Vault or similar for production secrets
- Restrict Confluence API tokens to least privilege

## 6. Troubleshooting
- Check logs for errors (see `src/utils/logger.js`)
- Ensure bot registration and credentials are correct
- Verify Confluence API permissions and base URL
- For rate limits, see [docs/CONFLUENCE_INTEGRATION.md](CONFLUENCE_INTEGRATION.md)

## Screenshots
_Add screenshots of Azure registration, ngrok, and Teams bot setup as needed._
