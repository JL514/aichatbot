# Validation Guide

## Overview
This project uses Joi and Ajv for comprehensive validation of all user input, API responses, and Adaptive Card payloads.

## Input Validation
- All incoming Teams messages are validated for structure, length, and content using Joi (`src/validators/messageValidator.js`).
- All user input is sanitized to prevent injection attacks.

## API Response Validation
- OpenAI and Confluence API responses are validated using Ajv and JSON schemas in `schemas/`.
- See `src/validators/openaiValidator.js` and `src/validators/confluenceValidator.js`.

## Adaptive Card Validation
- All Adaptive Card payloads are validated against a schema before sending to Teams (`src/validators/cardValidator.js`).

## Error Handling
- Validation errors are caught and reported with user-friendly messages.
- See `src/utils/errorHandler.js` for error categorization and reporting.

## Best Practices
- Always validate and sanitize all external input and output.
- Update schemas and validators as requirements change.
- Add tests for all validation logic and edge cases.

## References
- [Joi Documentation](https://joi.dev/api/)
- [Ajv Documentation](https://ajv.js.org/)
- [Adaptive Card Schema](https://adaptivecards.io/schemas/adaptive-card.json)
