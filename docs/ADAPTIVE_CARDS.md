# Adaptive Cards Guide

## Overview
Adaptive Cards are used to present rich, interactive search results and error messages in Microsoft Teams.

## Templates
- Templates are stored in `templates/adaptiveCards/`
- `searchResults.json`: For displaying Confluence search results with titles, summaries, and action buttons
- `errorCard.json`: For displaying user-friendly error messages and suggestions

## Customization
- You can modify templates to change layout, add icons, or adjust actions
- Use [Adaptive Cards Designer](https://adaptivecards.io/designer/) for visual editing

## Responsive Design
- Cards are designed to work across Teams desktop, web, and mobile
- Use short summaries and concise titles for best results

## Actions
- Action.OpenUrl: Opens Confluence page in browser
- Action.Submit: Used for pagination (e.g., Next Page)

## Troubleshooting
- If a card does not render, validate JSON with the Adaptive Cards Designer
- Ensure all dynamic fields are provided in the data object

## References
- [Adaptive Cards Schema](https://adaptivecards.io/schemas/adaptive-card.json)
- [Microsoft Teams Adaptive Cards](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference)
