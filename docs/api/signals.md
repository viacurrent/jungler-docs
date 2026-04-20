# Signals API

The Signals API allows you to create, manage, and monitor your signals (saved searches).

:::info Authentication Required
All API requests require authentication. See [API Overview](./index.md#authentication) for details.
:::

:::tip Response Format
Null fields are omitted from responses. For example, `prompt` is only included for keyword signals that have one configured, and `query_identifier` is only included for profile and company signals.
:::

## List Signals

Get signals in a workspace.

```http
GET /api/signals
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace_id` | string | Yes | The workspace ID to list signals for |
| `query_type` | string | No | Filter by signal type: `search_keyword`, `user_profile`, or `company_profile`. Returns all types if omitted |
| `is_activated` | boolean | No | Filter by activation status. Returns both active and inactive if omitted |

### Response

Returns an array of signal objects. Fields that are `null` are omitted.

```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Brand Mentions",
    "query": "lemlist OR \"heyreach\"",
    "frequency": 24,
    "is_activated": true,
    "prompt": "Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools",
    "query_type": "search_keyword",
    "created_at": "2024-01-10T08:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Follow Specific Person",
    "query": "https://social.com/in/vearnold",
    "frequency": 24,
    "is_activated": true,
    "query_type": "user_profile",
    "query_identifier": "vearnold",
    "created_at": "2024-01-12T09:00:00Z",
    "updated_at": "2024-01-12T09:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Company Posts",
    "query": "https://social.com/company/example-corp",
    "frequency": 24,
    "is_activated": true,
    "query_type": "company_profile",
    "query_identifier": "12345678",
    "created_at": "2024-01-13T10:00:00Z",
    "updated_at": "2024-01-13T10:00:00Z"
  }
]
```

### Response Fields

| Field | Type | Present | Description |
|-------|------|---------|-------------|
| `_id` | string | Always | Unique signal identifier |
| `name` | string | Always | Signal name |
| `query` | string | Always | Search query (keywords, profile URL, or company URL) |
| `frequency` | integer | Always | Run frequency in hours (default: `24`) |
| `is_activated` | boolean | Always | Whether the signal is active |
| `prompt` | string | Keyword only, when configured | Custom AI filtering prompt |
| `query_type` | string | Always | Type of query: `search_keyword`, `user_profile`, `company_profile` |
| `query_identifier` | string | Profile/company only | Username or company ID extracted from the URL |
| `webhook_url` | string | When configured | HTTPS URL for run completion callbacks |
| `created_at` | string | Always | ISO 8601 timestamp |
| `updated_at` | string | Always | ISO 8601 timestamp |

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

# Filter by type
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/signals?workspace_id=507f1f77bcf86cd799439013&query_type=search_keyword"

# Only active signals
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/signals?workspace_id=507f1f77bcf86cd799439013&is_activated=true"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const url = new URL('https://production.viacurrent.com/api/signals');
url.searchParams.append('workspace_id', '507f1f77bcf86cd799439013');
// Optional: filter by type
// url.searchParams.append('query_type', 'user_profile');
// Optional: filter by activation status
// url.searchParams.append('is_activated', 'true');

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
# Optional: filter by type
# params["query_type"] = "company_profile"
# Optional: filter by activation status
# params["is_activated"] = True

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

### Response

**Keyword signal:**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Brand Mentions",
  "query": "lemlist OR \"heyreach\"",
  "frequency": 24,
  "is_activated": true,
  "prompt": "Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools",
  "query_type": "search_keyword",
  "created_at": "2024-01-10T08:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Profile signal:**

```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Follow Specific Person",
  "query": "https://social.com/in/vearnold",
  "frequency": 24,
  "is_activated": true,
  "query_type": "user_profile",
  "query_identifier": "vearnold",
  "webhook_url": "https://customer.com/callback",
  "created_at": "2024-01-12T09:00:00Z",
  "updated_at": "2024-01-12T09:00:00Z"
}
```

### Rate Limiting

- **60 requests per minute** per API key

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/signals/507f1f77bcf86cd799439012
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const signalId = '507f1f77bcf86cd799439012';

const response = await fetch(`https://production.viacurrent.com/api/signals/${signalId}`, {
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

response = httpx.get(url, headers=headers)
signal = response.json()
```

</TabItem>
</Tabs>

---

## Create Signal

Create a new signal in a workspace. **The first run is triggered automatically** — you don't need a separate API call to start it.

```http
POST /api/signals
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `workspace_id` | string | Yes | The workspace ID to create the signal in |
| `name` | string | Yes | Signal name (1-69 characters) |
| `query` | string | Yes | Search keywords, profile URL, or company URL (3-300 characters) |
| `prompt` | string | No | AI filtering prompt for keyword signals only (3-3000 characters). Ignored for profile/company signals |
| `prompt_name` | string | No | Name for the prompt (defaults to "AI filter"). Write-only — not returned in responses. Ignored for profile/company signals |
| `webhook_url` | string | No | HTTPS URL to receive run completion callbacks (max 1000 characters) |

The signal type (`query_type`) is automatically detected from the `query` string:
- **Keywords** → `search_keyword` — e.g. `"lemlist OR \"heyreach\""`
- **Profile URL** → `user_profile` — e.g. `"https://social.com/in/vearnold"`
- **Company URL** → `company_profile` — e.g. `"https://social.com/company/example"`

:::info AI Filtering (Keyword Signals Only)
The `prompt` and `prompt_name` fields are only used for **keyword signals**. They let you define custom AI criteria for filtering posts (see [AI Filtering](../ai-filtering.md)). For profile and company signals, these fields are ignored — all posts from the tracked profile are collected automatically.
:::

:::note Enrichment for Profile/Company Signals
When creating `user_profile` or `company_profile` signals, the API validates and enriches the profile synchronously. This means the request may take **5-15 seconds** for these signal types. Keyword signals are instant.
:::

### Run Lifecycle

Signals run **automatically** on a ~24-hour schedule:

1. **First run** starts immediately when the signal is created
2. **Subsequent runs** are triggered automatically every ~24 hours

There is no endpoint to manually trigger additional runs. Use [Run Status](#run-status) to poll for completion, or provide a `webhook_url` to receive a callback when each run finishes.

### Response

Returns `201 Created` with the signal object and initial run info:

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Brand Mentions",
  "query": "lemlist OR \"heyreach\"",
  "frequency": 24,
  "is_activated": true,
  "prompt": "Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools",
  "query_type": "search_keyword",
  "webhook_url": "https://customer.com/callback",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "run": {
    "run_id": "507f1f77bcf86cd799439099",
    "status": "queued"
  }
}
```

### Rate Limiting

- **6 requests per minute** per API key

### Example Requests

#### Keyword Signal (with AI filtering)

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://production.viacurrent.com/api/signals \
     -H "X-API-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "workspace_id": "507f1f77bcf86cd799439013",
       "name": "Brand Mentions",
       "query": "lemlist OR \"heyreach\"",
       "prompt": "Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools",
       "webhook_url": "https://customer.com/callback"
     }'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch('https://production.viacurrent.com/api/signals', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    workspace_id: '507f1f77bcf86cd799439013',
    name: 'Brand Mentions',
    query: 'lemlist OR "heyreach"',
    prompt: 'Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools',
    webhook_url: 'https://customer.com/callback'
  })
});

const signal = await response.json();
// signal.run.run_id — the auto-triggered first run
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://production.viacurrent.com/api/signals",
    headers={"X-API-Key": "your_api_key_here"},
    json={
        "workspace_id": "507f1f77bcf86cd799439013",
        "name": "Brand Mentions",
        "query": 'lemlist OR "heyreach"',
        "prompt": "Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools",
        "webhook_url": "https://customer.com/callback"
    },
)
signal = response.json()
print(f"Signal created: {signal['_id']}, first run: {signal['run']['run_id']}")
```

</TabItem>
</Tabs>

#### Profile Signal (no prompt needed)

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://production.viacurrent.com/api/signals \
     -H "X-API-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "workspace_id": "507f1f77bcf86cd799439013",
       "name": "Follow Arnold",
       "query": "https://social.com/in/vearnold",
       "webhook_url": "https://customer.com/callback"
     }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://production.viacurrent.com/api/signals",
    headers={"X-API-Key": "your_api_key_here"},
    json={
        "workspace_id": "507f1f77bcf86cd799439013",
        "name": "Follow Arnold",
        "query": "https://social.com/in/vearnold",
        "webhook_url": "https://customer.com/callback"
    },
)
```

</TabItem>
</Tabs>

#### Company Signal (no prompt needed)

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://production.viacurrent.com/api/signals \
     -H "X-API-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "workspace_id": "507f1f77bcf86cd799439013",
       "name": "Acme Corp Posts",
       "query": "https://social.com/company/acme-corp",
       "webhook_url": "https://customer.com/callback"
     }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://production.viacurrent.com/api/signals",
    headers={"X-API-Key": "your_api_key_here"},
    json={
        "workspace_id": "507f1f77bcf86cd799439013",
        "name": "Acme Corp Posts",
        "query": "https://social.com/company/acme-corp",
        "webhook_url": "https://customer.com/callback"
    },
)
```

</TabItem>
</Tabs>

---

## Run Status

Get the status of the latest run for a signal. Use this to poll for completion after creating a signal, or to check the status of the latest scheduled run.

```http
GET /api/signals/{signal_id}/run
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `signal_id` | string | The signal to check |

### Response

```json
{
  "signal_id": "507f1f77bcf86cd799439012",
  "run_id": "507f1f77bcf86cd799439099",
  "status": "running",
  "started_at": "2025-01-15T10:30:00Z"
}
```

### Response Fields

| Field | Type | Present | Description |
|-------|------|---------|-------------|
| `signal_id` | string | Always | The signal this run belongs to |
| `run_id` | string | Always | Unique run identifier |
| `status` | string | Always | One of: `queued`, `pending`, `running`, `success`, `success_with_warnings`, `failed`, `timed_out`, `cancelled` |
| `started_at` | string | After start | ISO 8601 timestamp when the run started |
| `completed_at` | string | After completion | ISO 8601 timestamp when the run finished |
| `duration_ms` | integer | After completion | Total run duration in milliseconds |
| `error` | string | On failure | Error message if the run failed |

:::tip Polling Strategy
Poll every **10-30 seconds**. Most runs complete within 2-5 minutes. Once `status` is one of `success`, `success_with_warnings`, `failed`, `timed_out`, or `cancelled`, the run is finished and you can fetch the results via the [Posts API](./posts.md) or [Engagers API](./engagers.md).
:::

Returns `404 Not Found` if the signal has never been run.

### Rate Limiting

- **60 requests per minute** per API key

### Example: Create Signal and Poll Until Complete

<Tabs>
<TabItem value="python" label="Python" default>

```python
import httpx
import time

API_KEY = "your_api_key_here"
BASE = "https://production.viacurrent.com/api"
WORKSPACE_ID = "507f1f77bcf86cd799439013"

headers = {"X-API-Key": API_KEY}

# 1. Create signal (first run starts automatically)
create_response = httpx.post(
    f"{BASE}/signals",
    headers=headers,
    json={
        "workspace_id": WORKSPACE_ID,
        "name": "Brand Mentions",
        "query": 'lemlist OR "heyreach"',
        "prompt": "Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools"
    },
)
signal = create_response.json()
signal_id = signal["_id"]
print(f"Signal created: {signal_id}, run: {signal['run']['run_id']}")

# 2. Poll until the first run completes
terminal_statuses = {"success", "success_with_warnings", "failed", "timed_out", "cancelled"}

while True:
    time.sleep(15)
    status_response = httpx.get(
        f"{BASE}/signals/{signal_id}/run",
        headers=headers,
    )
    run = status_response.json()
    print(f"  Status: {run['status']}")

    if run["status"] in terminal_statuses:
        break

# 3. Fetch results
if run["status"] in ("success", "success_with_warnings"):
    posts = httpx.get(
        f"{BASE}/posts",
        headers=headers,
        params={"workspace_id": WORKSPACE_ID, "signal_ids": signal_id},
    ).json()
    print(f"Got {len(posts['items'])} posts")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# Create signal (first run starts automatically)
curl -X POST https://production.viacurrent.com/api/signals \
     -H "X-API-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "workspace_id": "507f1f77bcf86cd799439013",
       "name": "Brand Mentions",
       "query": "lemlist OR \"heyreach\"",
       "prompt": "Only include posts that explicitly mention lemlist or HeyReach, the outreach tools"
     }'

# Poll status (repeat every 10-30s until status is terminal)
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/signals/507f1f77bcf86cd799439012/run
```

</TabItem>
</Tabs>

---

## Deactivate Signal

Pause a signal. It will stop running on its schedule until reactivated. The signal and its collected data remain accessible.

```http
PUT /api/signals/{signal_id}/deactivate
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `signal_id` | string | The signal to deactivate |

### Response

Returns the updated signal object with `is_activated: false`.

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Brand Mentions",
  "query": "lemlist OR \"heyreach\"",
  "frequency": 24,
  "is_activated": false,
  "prompt": "Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools",
  "query_type": "search_keyword",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-20T14:00:00Z"
}
```

### Rate Limiting

- **6 requests per minute** per API key

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -X PUT https://production.viacurrent.com/api/signals/507f1f77bcf86cd799439012/deactivate \
     -H "X-API-Key: your_api_key_here"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

signal_id = "507f1f77bcf86cd799439012"
response = httpx.put(
    f"https://production.viacurrent.com/api/signals/{signal_id}/deactivate",
    headers={"X-API-Key": "your_api_key_here"},
)
signal = response.json()
print(f"Deactivated: {signal['is_activated']}")  # False
```

</TabItem>
</Tabs>

---

## Activate Signal

Reactivate a paused signal. It will resume running on its schedule.

```http
PUT /api/signals/{signal_id}/activate
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `signal_id` | string | The signal to activate |

### Response

Returns the updated signal object with `is_activated: true`.

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Brand Mentions",
  "query": "lemlist OR \"heyreach\"",
  "frequency": 24,
  "is_activated": true,
  "prompt": "Only mark relevant the posts that explicitly mention lemlist or HeyReach, the outreach tools",
  "query_type": "search_keyword",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-20T15:00:00Z"
}
```

### Rate Limiting

- **6 requests per minute** per API key

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -X PUT https://production.viacurrent.com/api/signals/507f1f77bcf86cd799439012/activate \
     -H "X-API-Key: your_api_key_here"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

signal_id = "507f1f77bcf86cd799439012"
response = httpx.put(
    f"https://production.viacurrent.com/api/signals/{signal_id}/activate",
    headers={"X-API-Key": "your_api_key_here"},
)
signal = response.json()
print(f"Active: {signal['is_activated']}")  # True
```

</TabItem>
</Tabs>

---

## Delete Signal

Permanently delete a signal. Posts and engagers collected by this signal remain accessible.

```http
DELETE /api/signals/{signal_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `signal_id` | string | The signal to delete |

### Response

Returns `204 No Content` with an empty body.

### Rate Limiting

- **6 requests per minute** per API key

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -X DELETE https://production.viacurrent.com/api/signals/507f1f77bcf86cd799439012 \
     -H "X-API-Key: your_api_key_here"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

signal_id = "507f1f77bcf86cd799439012"
response = httpx.delete(
    f"https://production.viacurrent.com/api/signals/{signal_id}",
    headers={"X-API-Key": "your_api_key_here"},
)
assert response.status_code == 204
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

On **create** — workspace signal limit reached:
```json
{
  "detail": "workspace_signal_limit_reached"
}
```

On **read/update/delete** — signal doesn't belong to your workspace:
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

## Full API Workflow

The complete API-only workflow to create a signal and consume results:

1. **Create** a signal → `POST /api/signals` (first run starts automatically)
2. **Wait** for results:
   - **Option A: Poll** → `GET /api/signals/{id}/run` every 10-30s until status is terminal
   - **Option B: Webhook** → provide a `webhook_url` when creating the signal; you'll receive a POST when each run completes
3. **Fetch results** → [Posts API](./posts.md) and/or [Engagers API](./engagers.md)
4. **Ongoing** — the signal runs automatically every ~24 hours. Use polling or webhooks to know when new results are ready.
5. **Manage** — [deactivate](#deactivate-signal)/[activate](#activate-signal) to pause/resume, or [delete](#delete-signal) to remove permanently.

---

## Run Completion Callback

If you provide a `webhook_url` when creating a signal, we'll POST to that URL every time a run completes — including the auto-triggered first run and all subsequent scheduled runs.

:::note Not the same as Webhooks
This is a lightweight callback that notifies you when a signal run finishes. It does **not** deliver posts or engagers — you still fetch those via the [Posts API](./posts.md) or [Engagers API](./engagers.md). For automatically pushing collected data to external platforms (Slack, n8n, etc.), see [Webhooks](../integrations/webhooks.md).
:::

### Payload

The callback payload matches the [Run Status](#run-status) response:

```http
POST https://customer.com/callback
Content-Type: application/json

{
  "signal_id": "507f1f77bcf86cd799439012",
  "run_id": "507f1f77bcf86cd799439099",
  "status": "success",
  "started_at": "2025-01-15T10:30:00Z",
  "completed_at": "2025-01-15T10:33:45Z",
  "duration_ms": 225000
}
```

### Delivery

- Timeout: 5 seconds per attempt
- Retries: 1 retry after 30 seconds on failure
- URL must be HTTPS

:::tip
You can use webhooks and polling together. The webhook notifies you immediately, and polling serves as a fallback if the webhook delivery fails.
:::

## Next Steps

Once you have signal IDs, you can:
- [Retrieve posts from these signals](./posts.md)
- [Get engagers for profile signals](./engagers.md#signal-engagers) (user_profile and company_profile types)
- Filter posts by multiple signals simultaneously
- [Send results to integrations via webhooks](../integrations/webhooks.md)