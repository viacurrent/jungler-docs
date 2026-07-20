---
description: Tools API reference — utilities for parsing social post URLs and extracting timestamps, as well as splitting full names into first and last names.
---

# Tools API

The Tools API provides public utility endpoints for common data transformations, such as extracting the creation timestamp from a social post URL or parsing a full name into its first and last name components.

:::info Authentication Required
All API requests require authentication. See [API Overview](./index.md#authentication) for details.
:::

---

## Social URL Timestamp

Get the UTC creation time of a social media post.

```http
GET /api/tools/social-url-timestamp
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | A social post/activity URL. |

### Response

```json
{
  "id": "7349008612637241345",
  "timestamp": "2025-07-10T09:36:31.230000Z",
  "unix_ms": 1752140191230
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | The numeric social post/activity ID extracted from the input |
| `timestamp` | string | UTC creation time decoded from the ID |
| `unix_ms` | integer | Creation time as Unix milliseconds |

### Rate Limiting

- **500 requests per minute** per API key

### Example Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/tools/social-url-timestamp?url=https://www.linkedin.com/posts/johndoe_activity-7349008612637241345"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const url = new URL('https://production.viacurrent.com/api/tools/social-url-timestamp');
url.searchParams.append('url', 'https://www.linkedin.com/posts/johndoe_activity-7349008612637241345');

const response = await fetch(url, {
  headers: {
    'X-API-Key': 'your_api_key_here'
  }
});

const data = await response.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

url = "https://production.viacurrent.com/api/tools/social-url-timestamp"
headers = {"X-API-Key": "your_api_key_here"}
params = {"url": "7349008612637241345"}

response = httpx.get(url, headers=headers, params=params)
data = response.json()
```

</TabItem>
</Tabs>

---

## Parse Name

Split a full name string into first and last name components. Handles complex names with prefixes, suffixes, and multiple parts.

```http
GET /api/tools/parse-name
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | A full name to split into first and last name |

### Response

```json
{
  "first_name": "John",
  "last_name": "Doe"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `first_name` | string | Parsed first name |
| `last_name` | string | Parsed last name |

### Rate Limiting

- **500 requests per minute** per API key

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/tools/parse-name?name=John%20Doe"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const url = new URL('https://production.viacurrent.com/api/tools/parse-name');
url.searchParams.append('name', 'John Doe');

const response = await fetch(url, {
  headers: {
    'X-API-Key': 'your_api_key_here'
  }
});

const data = await response.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

url = "https://production.viacurrent.com/api/tools/parse-name"
headers = {"X-API-Key": "your_api_key_here"}
params = {"name": "John Doe"}

response = httpx.get(url, headers=headers, params=params)
data = response.json()
```

</TabItem>
</Tabs>

---

## Error Responses

#### 400 Bad Request
When providing an invalid URL or ID that we can't parse.
```json
{
  "detail": "Input not valid: https://www.linkedin.com/in/johndoe"
}
```

#### 429 Too Many Requests
```json
{
  "detail": "Rate limit exceeded"
}
```
