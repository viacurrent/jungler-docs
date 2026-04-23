---
sidebar_position: 2
description: Make your first Jungler API call in minutes — authenticate, list workspaces, and pull enriched LinkedIn engagers with curl and Python examples.
keywords:
    - jungler api
    - linkedin api
    - api quick start
    - api authentication
    - api key
---

# Quick Start

Get started with the Jungler API in minutes. This guide walks you through making your first API call and retrieving data.

## Prerequisites

Before you begin, you'll need:
- A Jungler account
- An API key (create one at [app.jungler.ai/settings/integrations](https://app.jungler.ai/settings/integrations))

## Step 1: Get Your API Key

1. Navigate to [https://app.jungler.ai/settings/integrations](https://app.jungler.ai/settings/integrations)
2. Click "Create API Key"
3. Copy and save your key securely - you won't be able to see it again

## Step 2: Get Your Workspace ID

Every API request requires a workspace ID. List your available workspaces:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/workspaces
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    'https://production.viacurrent.com/api/workspaces',
    headers={'X-API-Key': 'your_api_key_here'}
)
print(response.json())
```

  </TabItem>
</Tabs>

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "My Company Workspace",
    "role": "admin"
  }
]
```

Save the `_id` - this is your workspace ID for subsequent requests.

## Step 3: List Your Signals

Check which signals are collecting posts in your workspace:

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/signals?workspace_id=507f1f77bcf86cd799439011"
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    'https://production.viacurrent.com/api/signals',
    headers={'X-API-Key': 'your_api_key_here'},
    params={'workspace_id': '507f1f77bcf86cd799439011'}
)
print(response.json())
```

  </TabItem>
</Tabs>

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Tech Industry Leaders",
    "query": "CTO OR \"Chief Technology Officer\"",
    "query_type": "keyword",
    "is_activated": true
  }
]
```

Save the signal `_id` to filter posts.

## Step 4: Retrieve Posts

Get posts from your signals with filters:

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/posts?workspace_id=507f1f77bcf86cd799439011&signal_ids=507f1f77bcf86cd799439012&page_size=10&match=relevant"
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    'https://production.viacurrent.com/api/posts',
    headers={'X-API-Key': 'your_api_key_here'},
    params={
        'workspace_id': '507f1f77bcf86cd799439011',
        'signal_ids': '507f1f77bcf86cd799439012',
        'page_size': 10,
        'match': 'relevant'
    }
)
print(response.json())
```

  </TabItem>
</Tabs>

**Response:**
```json
{
  "items": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "content": "Excited to announce...",
      "author": {
        "name": "Jane Smith",
        "profile_url": "https://social.com/in/janesmith",
        "function": "ENG",
        "authority": "L"
      },
      "posted_at": "2024-01-15T10:30:00Z",
      "reaction_count": 42,
      "comment_count": 8
    }
  ],
  "total": 150,
  "page": 1,
  "page_size": 10,
  "pages": 15
}
```

## Next Steps

### Extract Post Interactions

Want to get comments and reactions from a specific post? See the [Workbooks API Quick Start](./workbooks.md#quick-start).

### Advanced Filtering

Explore powerful filtering options:

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
# Filter by sentiment and function
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/posts?workspace_id=507f1f77bcf86cd799439011&signal_ids=507f1f77bcf86cd799439012&sentiment=positive&function=ENG,PRD&authority=L"

# Filter by date range
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/posts?workspace_id=507f1f77bcf86cd799439011&signal_ids=507f1f77bcf86cd799439012&created_after=2024-01-01&created_before=2024-01-31"

# Filter by company size and industry
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/posts?workspace_id=507f1f77bcf86cd799439011&signal_ids=507f1f77bcf86cd799439012&company_size=L,XL,XXL&company_industry=TECH_INFO_MEDIA"
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import httpx

# Filter by sentiment and function
response = httpx.get(
    'https://production.viacurrent.com/api/posts',
    headers={'X-API-Key': 'your_api_key_here'},
    params={
        'workspace_id': '507f1f77bcf86cd799439011',
        'signal_ids': '507f1f77bcf86cd799439012',
        'sentiment': 'positive',
        'function': 'ENG,PRD',
        'authority': 'L'
    }
)

# Filter by date range
response = httpx.get(
    'https://production.viacurrent.com/api/posts',
    headers={'X-API-Key': 'your_api_key_here'},
    params={
        'workspace_id': '507f1f77bcf86cd799439011',
        'signal_ids': '507f1f77bcf86cd799439012',
        'created_after': '2024-01-01',
        'created_before': '2024-01-31'
    }
)

# Filter by company size and industry
response = httpx.get(
    'https://production.viacurrent.com/api/posts',
    headers={'X-API-Key': 'your_api_key_here'},
    params={
        'workspace_id': '507f1f77bcf86cd799439011',
        'signal_ids': '507f1f77bcf86cd799439012',
        'company_size': 'L,XL,XXL',
        'company_industry': 'TECH_INFO_MEDIA'
    }
)
```

  </TabItem>
</Tabs>

See the [Posts API documentation](./posts.md) for all available filters.

## Common Issues

### 401 Unauthorized
- **Cause**: Invalid or missing API key
- **Solution**: Verify your API key is correct and included in the `X-API-Key` header

### 403 Forbidden
- **Cause**: No access to the specified workspace or search
- **Solution**: Check that you have access to the workspace ID and that the search belongs to that workspace

### 429 Too Many Requests
- **Cause**: Rate limit exceeded
- **Solution**: Implement exponential backoff and reduce request frequency

### 400 Bad Request
- **Cause**: Invalid parameters or format
- **Solution**: Check parameter names, value formats, and ensure required fields are provided

## Rate Limits

| Endpoint | Rate Limit |
|----------|------------|
| GET /workspaces | 30/minute |
| GET /signals | 30/minute |
| GET /posts | 60/minute |
| POST /workbooks | 6/minute |
| GET /engagers/* | 60/minute |

## Further Reading

- [API](./index.md) - Complete API documentation
- [Posts API](./posts.md) - Detailed filtering options
- [Workbooks API](./workbooks.md) - Extract post interactions
- [Signals API](./signals.md) - Manage signals
