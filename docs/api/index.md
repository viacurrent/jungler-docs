# API Reference

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
| POST /workbooks | 6/minute |
| GET /workbooks/\* | 12/minute |
| GET /workspaces | 30/minute |
| GET /searches | 30/minute |
| GET /searches/:id | 60/minute |
| GET /posts | 60/minute |

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response.

## API Endpoints

### Core Resources

- **[Workspaces](/api/workspaces)** - List your workspaces
- **[Searches](/api/searches)** - List and retrieve search configurations
- **[Posts](/api/posts)** - Retrieve and filter posts
- **[Workbooks](/api/workbooks)** - Extract post interactions and contacts
- **[Webhooks](/api/webhooks)** - Send data to external platforms automatically

## Quick Start

### 1. Get your workspaces

```bash
curl -X GET "https://production.viacurrent.com/api/workspaces" \
  -H "X-API-Key: your_api_key_here"
```

### 2. List searches in a workspace

```bash
curl -X GET "https://production.viacurrent.com/api/searches?workspace_id=YOUR_WORKSPACE_ID" \
  -H "X-API-Key: your_api_key_here"
```

### 3. Retrieve posts

```bash
curl -X GET "https://production.viacurrent.com/api/posts?workspace_id=YOUR_WORKSPACE_ID&search_ids=YOUR_SEARCH_ID" \
  -H "X-API-Key: your_api_key_here"
```

## Response Format

All API responses use JSON format. Successful responses have a `2xx` status code.

### Success Response

```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "page_size": 50
}
```

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

### Pagination

- Always use `snapshot_time` for consistent pagination across multiple pages
- Save the `snapshot_time` from your first request and reuse it for subsequent pages
- Maximum page size is 500 items

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
