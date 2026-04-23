---
sidebar_label: Overview
description: Jungler API overview — authentication, base URL, rate limits, and a map of every endpoint for accessing signals, posts, workbooks, and engagers.
---

# API Overview

Welcome to the Jungler API documentation. The Jungler API allows you to programmatically access and analyze data collected by your searches.

## Base URL

```
https://production.viacurrent.com/api
```

## Authentication

All requests require an API key in the header:

```bash
X-API-Key: your_api_key_here
```

### Getting an API Key

1. Log in to your Jungler account
2. Navigate to Settings → API Keys
3. Generate a new API key
4. Store it securely - it won't be shown again

## Rate Limiting

API requests are rate-limited per endpoint:

| Endpoint | Rate Limit |
|----------|------------|
| GET /workspaces | 30/minute |
| GET /signals | 30/minute |
| `GET /signals/{signal_id}` | 60/minute |
| POST /signals | 6/minute |
| `GET /signals/{signal_id}/run` | 60/minute |
| `PUT /signals/{signal_id}/activate` | 6/minute |
| `PUT /signals/{signal_id}/deactivate` | 6/minute |
| `DELETE /signals/{signal_id}` | 6/minute |
| GET /posts | 60/minute |
| GET /engagers/* | 60/minute |
| POST /workbooks | 6/minute |
| `GET /tasks/{task_id}/status` | 60/minute |

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response.

## API Endpoints

### Core Resources

- **[Workspaces](./workspaces.md)** - List your workspaces
- **[Signals](./signals.md)** - List and retrieve signal configurations
- **[Posts](./posts.md)** - Retrieve and filter posts
- **[Engagers](./engagers.md)** - Retrieve interactions (comments, reactions) and contacts
- **[Workbooks](./workbooks.md)** - Create extraction tasks for specific posts
- **[Webhooks](../integrations/webhooks.md)** - Send data to external platforms automatically

## Quick Start

### 1. Get your workspaces

```bash
curl -X GET "https://production.viacurrent.com/api/workspaces" \
  -H "X-API-Key: your_api_key_here"
```

### 2. List signals in a workspace

```bash
curl -X GET "https://production.viacurrent.com/api/signals?workspace_id=YOUR_WORKSPACE_ID" \
  -H "X-API-Key: your_api_key_here"
```

### 3. Retrieve posts

```bash
curl -X GET "https://production.viacurrent.com/api/posts?workspace_id=YOUR_WORKSPACE_ID&signal_ids=YOUR_SIGNAL_ID" \
  -H "X-API-Key: your_api_key_here"
```

## Response Format

All API responses use JSON format. Successful responses have a `2xx` status code.

### Error Response

```json
{
  "detail": "Error message description"
}
```

## Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 202 | Accepted (async operation started) |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing API key |
| 403 | Forbidden - No access to resource |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource state conflict |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Data Types

### Date/Time Format

All timestamps use ISO 8601 format with UTC timezone:

```
2024-01-15T10:30:00Z
```

For date-only filters, you can use:

```
2024-01-15
```

### Object IDs

Resource identifiers are MongoDB ObjectIds represented as 24-character hexadecimal strings:

```
507f1f77bcf86cd799439011
```

## Best Practices

### Filtering

- Use specific filters to reduce response size and improve performance
- Combine multiple filters to narrow down results
- Date ranges are limited to 31 days maximum

### Rate Limiting

- Implement exponential backoff when receiving 429 responses
- Cache responses when appropriate
- Batch requests when possible

### Error Handling

- Always check HTTP status codes
- Parse error details from the response body
- Implement retry logic for transient errors (5xx)

## Support

Need help? Contact us at team@jungler.ai or visit our [GitHub repository](https://github.com/viacurrent/jungler-docs).
