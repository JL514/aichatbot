# Development Guide

## Code Quality
- All code must pass ESLint and Prettier checks before commit (enforced by Husky/lint-staged)
- Use `npm run lint` and `npm run format:check` to check code quality
- Use `npm run lint:fix` and `npm run format` to auto-fix issues

## Validation
- All user input, API responses, and card payloads are validated using Joi or Ajv
- See `src/validators/` and `schemas/` for validation logic
- Add/update schemas as requirements evolve

## Testing
- All code must be covered by Jest tests
- Use `npm test`, `npm run test:watch`, and `npm run test:coverage`
- Add tests for validators, error handling, and edge cases

## Error Handling
- Use `src/utils/errorHandler.js` for all error reporting
- Never expose sensitive error details to users

## Contribution
- Follow code style and validation patterns in this repo
- Add/modify tests and docs for all changes
- Submit PRs with clear descriptions and validation evidence

## Debugging
- Use `LOG_LEVEL=debug` for verbose logs
- Use correlation IDs in logs for tracing

## Performance
- Use cacheManager for expensive API calls
- Monitor cache size and TTLs

## Security
- Sanitize all user input and output
- Validate all external API responses
- Never log secrets or tokens
