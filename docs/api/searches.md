# Searches API

The Searches API allows you to list and retrieve information about your searches.

## List Searches

Get all active searches in a workspace.

```http
GET /api/searches
```

### Authentication

Requires an API key in the header:

```
X-API-Key: your_api_key_here
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace_id` | string | Yes | The workspace ID to list searches for |

### Response

Returns an array of search objects.

```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Tech Industry Leaders",
    "query": "CTO OR \"Chief Technology Officer\"",
    "frequency": "daily",
    "is_activated": true,
    "prompt": "Find posts from CTOs in tech companies",
    "query_type": "keyword",
    "query_identifier": "tech_ctos_v1",
    "created_at": "2024-01-10T08:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Follow Specific Person",
    "query": "https://linkedin.com/in/vearnold",
    "frequency": "daily",
    "is_activated": true,
    "prompt": "Track all posts from this user",
    "query_type": "people",
    "query_identifier": "vearnold",
    "created_at": "2024-01-12T09:00:00Z",
    "updated_at": "2024-01-12T09:00:00Z"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | string | Unique search identifier |
| `name` | string | Search name |
| `query` | string | Search query (varies by `query_type`) |
| `frequency` | string | Search frequency: `hourly`, `daily`, `weekly` |
| `is_activated` | boolean | Whether the search is active |
| `prompt` | string | AI prompt used for the search |
| `query_type` | string | Type of query: `keyword`, `people`, `company` |
| `query_identifier` | string | Username (for `people`) or company ID (for `company`) or unique identifier (for `keyword`) |
| `created_at` | string | ISO 8601 timestamp |
| `updated_at` | string | ISO 8601 timestamp |

#### Query Type Examples

The `query` and `query_identifier` fields vary based on `query_type`:

**Keyword Search** (`query_type: "keyword"`):
- `query`: Search terms, e.g., `"CTO OR \"Chief Technology Officer\""`
- `query_identifier`: Unique identifier for the search, e.g., `"tech_ctos_v1"`

**People Search** (`query_type: "people"`):
- `query`: Profile URL or username
- `query_identifier`: Username, e.g., `"vearnold"`

**Company Search** (`query_type: "company"`):
- `query`: Company URL or identifier
- `query_identifier`: Company identifier, e.g., `"12345678"`

### Rate Limiting

- **30 requests per minute** per API key

### Example Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/searches?workspace_id=507f1f77bcf86cd799439013
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

url = "https://production.viacurrent.com/api/searches"
headers = {"X-API-Key": "your_api_key_here"}
params = {"workspace_id": "507f1f77bcf86cd799439013"}

response = httpx.get(url, headers=headers, params=params)
searches = response.json()
```

</TabItem>
</Tabs>

---

## Get Search

Get detailed information about a specific search.

```http
GET /api/searches/{search_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `search_id` | string | The search ID to retrieve |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace_id` | string | Yes | The workspace ID that owns this search |

### Response

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Tech Industry Leaders",
  "query": "CTO OR \"Chief Technology Officer\"",
  "frequency": "daily",
  "is_activated": true,
  "prompt": "Find posts from CTOs in tech companies",
  "query_type": "keyword",
  "query_identifier": "tech_ctos_v1",
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
     https://production.viacurrent.com/api/searches/507f1f77bcf86cd799439012?workspace_id=507f1f77bcf86cd799439013
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

search_id = "507f1f77bcf86cd799439012"
url = f"https://production.viacurrent.com/api/searches/{search_id}"
headers = {"X-API-Key": "your_api_key_here"}
params = {"workspace_id": "507f1f77bcf86cd799439013"}

response = httpx.get(url, headers=headers, params=params)
search = response.json()
```

</TabItem>
</Tabs>

---

## Use Cases

### Get search IDs for filtering posts

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# 1. List all searches
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/searches?workspace_id=507f1f77bcf86cd799439013

# 2. Use search IDs to filter posts
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/posts?workspace_id=507f1f77bcf86cd799439013&search_ids=507f1f77bcf86cd799439012,507f1f77bcf86cd799439015
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

headers = {"X-API-Key": "your_api_key_here"}
workspace_id = "507f1f77bcf86cd799439013"

# 1. List all searches
searches_response = httpx.get(
    "https://production.viacurrent.com/api/searches",
    headers=headers,
    params={"workspace_id": workspace_id}
)
searches = searches_response.json()

# 2. Use search IDs to filter posts
search_ids = ",".join([s["_id"] for s in searches["items"]])
posts_response = httpx.get(
    "https://production.viacurrent.com/api/posts",
    headers=headers,
    params={
        "workspace_id": workspace_id,
        "search_ids": search_ids
    }
)
posts = posts_response.json()
```

</TabItem>
</Tabs>

### Monitor search configuration

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# Get details of a specific search to check its configuration
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/searches/507f1f77bcf86cd799439012?workspace_id=507f1f77bcf86cd799439013
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

search_id = "507f1f77bcf86cd799439012"
url = f"https://production.viacurrent.com/api/searches/{search_id}"
headers = {"X-API-Key": "your_api_key_here"}
params = {"workspace_id": "507f1f77bcf86cd799439013"}

response = httpx.get(url, headers=headers, params=params)
search_config = response.json()
print(f"Search '{search_config['name']}' is {'active' if search_config['is_activated'] else 'inactive'}")
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
  "detail": "search_not_in_workspace"
}
```

#### 404 Not Found
```json
{
  "detail": "Search not found"
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

Once you have search IDs, you can:
- [Retrieve posts from these searches](/docs/api/posts)
- Filter posts by multiple searches simultaneously
- Track which searches are generating the most relevant content
