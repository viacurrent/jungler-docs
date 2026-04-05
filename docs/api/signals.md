# Signals API

The Signals API allows you to list and retrieve information about your signals (saved searches).

:::info Authentication Required
All API requests require authentication. See [API Overview](./index.md#authentication) for details.
:::

## List Signals

Get all active signals in a workspace.

```http
GET /api/signals
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace_id` | string | Yes | The workspace ID to list signals for |

### Response

Returns an array of signal objects.

```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Tech Industry Leaders",
    "query": "CTO OR \"Chief Technology Officer\"",
    "frequency": "daily",
    "is_activated": true,
    "prompt": "Find posts from CTOs in tech companies",
    "query_type": "search_keyword",
    "query_identifier": null,
    "created_at": "2024-01-10T08:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Follow Specific Person",
    "query": "https://social.com/in/vearnold",
    "frequency": "daily",
    "is_activated": true,
    "prompt": "Track all posts from this user",
    "query_type": "user_profile",
    "query_identifier": "vearnold",
    "created_at": "2024-01-12T09:00:00Z",
    "updated_at": "2024-01-12T09:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Company Posts",
    "query": "https://social.com/company/example-corp",
    "frequency": "daily",
    "is_activated": true,
    "prompt": "Track all posts from this company",
    "query_type": "company_profile",
    "query_identifier": "12345678",
    "created_at": "2024-01-13T10:00:00Z",
    "updated_at": "2024-01-13T10:00:00Z"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | string | Unique signal identifier |
| `name` | string | Signal name |
| `query` | string | Signal query (varies by `query_type`) |
| `frequency` | string | Signal frequency: `hourly`, `daily`, `weekly` |
| `is_activated` | boolean | Whether the signal is active |
| `prompt` | string | AI prompt used for this signal |
| `query_type` | string | Type of query: `search_keyword`, `user_profile`, `company_profile` |
| `query_identifier` | string \| null | Username for `user_profile`, company ID for `company_profile`, or `null` for `search_keyword` |
| `created_at` | string | ISO 8601 timestamp |
| `updated_at` | string | ISO 8601 timestamp |

#### Query Type Examples

The `query` and `query_identifier` fields vary based on `query_type`:

**Keyword Search** (`query_type: "search_keyword"`):
- `query`: Search terms, e.g., `"CTO OR \"Chief Technology Officer\""`
- `query_identifier`: Always `null`

**User Profile Signal** (`query_type: "user_profile"`):
- `query`: Profile URL, e.g., `"https://social.com/in/vearnold"`
- `query_identifier`: Username, e.g., `"vearnold"`

**Company Profile Signal** (`query_type: "company_profile"`):
- `query`: Company URL, e.g., `"https://social.com/company/example-corp"`
- `query_identifier`: Company ID, e.g., `"12345678"`

### Rate Limiting

- **30 requests per minute** per API key

### Example Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/signals?workspace_id=507f1f77bcf86cd799439013
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const url = new URL('https://production.viacurrent.com/api/signals');
url.searchParams.append('workspace_id', '507f1f77bcf86cd799439013');

const response = await fetch(url, {
  headers: {
    'X-API-Key': 'your_api_key_here'
  }
});

const signals = await response.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

url = "https://production.viacurrent.com/api/signals"
headers = {"X-API-Key": "your_api_key_here"}
params = {"workspace_id": "507f1f77bcf86cd799439013"}

response = httpx.get(url, headers=headers, params=params)
signals = response.json()
```

</TabItem>
</Tabs>

---

## Get Signal

Get detailed information about a specific signal.

```http
GET /api/signals/{signal_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `signal_id` | string | The signal ID to retrieve |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace_id` | string | Yes | The workspace ID that owns this signal |

### Response

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Tech Industry Leaders",
  "query": "CTO OR \"Chief Technology Officer\"",
  "frequency": "daily",
  "is_activated": true,
  "prompt": "Find posts from CTOs in tech companies",
  "query_type": "search_keyword",
  "query_identifier": null,
  "created_at": "2024-01-10T08:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Rate Limiting

- **60 requests per minute** per API key

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/signals/507f1f77bcf86cd799439012?workspace_id=507f1f77bcf86cd799439013
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const signalId = '507f1f77bcf86cd799439012';
const url = new URL(`https://production.viacurrent.com/api/signals/${signalId}`);
url.searchParams.append('workspace_id', '507f1f77bcf86cd799439013');

const response = await fetch(url, {
  headers: {
    'X-API-Key': 'your_api_key_here'
  }
});

const signal = await response.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

signal_id = "507f1f77bcf86cd799439012"
url = f"https://production.viacurrent.com/api/signals/{signal_id}"
headers = {"X-API-Key": "your_api_key_here"}
params = {"workspace_id": "507f1f77bcf86cd799439013"}

response = httpx.get(url, headers=headers, params=params)
signal = response.json()
```

</TabItem>
</Tabs>

---

## Use Cases

### Get signal IDs for filtering posts

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# 1. List all signals
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/signals?workspace_id=507f1f77bcf86cd799439013

# 2. Use signal IDs to filter posts
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/posts?workspace_id=507f1f77bcf86cd799439013&signal_ids=507f1f77bcf86cd799439012,507f1f77bcf86cd799439015"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 1. List all signals
const signalsUrl = new URL('https://production.viacurrent.com/api/signals');
signalsUrl.searchParams.append('workspace_id', '507f1f77bcf86cd799439013');

const signalsResponse = await fetch(signalsUrl, {
  headers: { 'X-API-Key': 'your_api_key_here' }
});
const signals = await signalsResponse.json();

// 2. Use signal IDs to filter posts
const postsUrl = new URL('https://production.viacurrent.com/api/posts');
postsUrl.searchParams.append('workspace_id', '507f1f77bcf86cd799439013');
postsUrl.searchParams.append('signal_ids', signals.map(s => s._id).join(','));

const postsResponse = await fetch(postsUrl, {
  headers: { 'X-API-Key': 'your_api_key_here' }
});
const posts = await postsResponse.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

headers = {"X-API-Key": "your_api_key_here"}
workspace_id = "507f1f77bcf86cd799439013"

# 1. List all signals
signals_response = httpx.get(
    "https://production.viacurrent.com/api/signals",
    headers=headers,
    params={"workspace_id": workspace_id}
)
signals = signals_response.json()

# 2. Use signal IDs to filter posts
signal_ids = ",".join(s["_id"] for s in signals)
posts_response = httpx.get(
    "https://production.viacurrent.com/api/posts",
    headers=headers,
    params={
        "workspace_id": workspace_id,
        "signal_ids": signal_ids,
    }
)
posts = posts_response.json()
```

</TabItem>
</Tabs>

### Get engagers for a profile signal

Signals with `query_type` of `user_profile` or `company_profile` have engagers (people who interacted with the tracked profile's posts).

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# Get engagers for a profile signal
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/signal/507f1f77bcf86cd799439013?workspace_id=507f1f77bcf86cd799439013&page=1&page_size=100"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

signal_id = "507f1f77bcf86cd799439013"
response = httpx.get(
    f"https://production.viacurrent.com/api/engagers/signal/{signal_id}",
    headers={"X-API-Key": "your_api_key_here"},
    params={"workspace_id": "507f1f77bcf86cd799439013", "page": 1, "page_size": 100},
)
engagers = response.json()
```

</TabItem>
</Tabs>

---

## Error Responses

#### 400 Bad Request
```json
{
  "detail": "Invalid workspace_id format"
}
```

#### 403 Forbidden
```json
{
  "detail": "signal_not_in_workspace"
}
```

#### 404 Not Found
```json
{
  "detail": "Signal not found"
}
```

#### 429 Too Many Requests
```json
{
  "detail": "Rate limit exceeded"
}
```

---

## Next Steps

Once you have signal IDs, you can:
- [Retrieve posts from these signals](./posts.md)
- [Get engagers for profile signals](./engagers.md#signal-engagers) (user_profile and company_profile types)
- Filter posts by multiple signals simultaneously
