---
description: Workbooks API reference — create or schedule temporary workbook runs to extract comments, reactions, and contact data from any LinkedIn post.
---

# Workbooks API

The Workbooks API allows you to create temporary workbooks that extract post interactions (comments, reactions) and contact information from posts, either immediately or at a scheduled future time.

:::info Authentication Required
All API requests require authentication. See [API Overview](./index.md#authentication) for details.
:::

:::warning Data Expiration
Workbook data is stored in temporary workbooks that **expire after 12 hours**. For immediate runs, this window starts when you create the workbook. For scheduled runs, it starts when the dispatcher creates the workbook at dispatch time. Make sure to retrieve all data you need within this timeframe using the [Engagers API](./engagers.md).
:::

## Quick Start

Extract interactions from a post in 3 steps:

### 1. Create a Workbook Run

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST \
     -H "X-API-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "post_url": "https://www.social.com/posts/username_activity-1234567890",
       "data_types": ["comment", "reaction"],
       "workspace_id": "507f1f77bcf86cd799439011",
       "webhook_url": "https://customer.com/callback"
     }' \
     https://production.viacurrent.com/api/workbooks
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch(
  "https://production.viacurrent.com/api/workbooks",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your_api_key_here",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_url: "https://www.social.com/posts/username_activity-1234567890",
      data_types: ["comment", "reaction"],
      workspace_id: "507f1f77bcf86cd799439011",
      webhook_url: "https://customer.com/callback",
    }),
  },
);

const result = await response.json();
console.log(result);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    'https://production.viacurrent.com/api/workbooks',
    headers={'X-API-Key': 'your_api_key_here'},
    json={
        'post_url': 'https://www.social.com/posts/username_activity-1234567890',
        'data_types': ['comment', 'reaction'],
        'workspace_id': '507f1f77bcf86cd799439011',
        'webhook_url': 'https://customer.com/callback'
    }
)
print(response.json())
```

  </TabItem>
</Tabs>

**Response:**

```json
{
  "run_id": "507f1f77bcf86cd799439099",
  "status": "queued",
  "workbook_id": "507f1f77bcf86cd799439012"
}
```

### 2. Wait for Completion

The extraction typically takes 1-3 minutes. Poll the [run status](#get-run-status) endpoint until it completes, or provide a `webhook_url` in your request to receive a callback.

### 3. Retrieve Your Data

Once complete, use the workbook ID from the creation response (also available via run status or webhook payload) to access collected data via the [Engagers API](./engagers.md):

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
# Get all engagers (comments + reactions)
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/workbook/507f1f77bcf86cd799439012?page=1&page_size=100"

# Get deduplicated contacts
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/workbook/507f1f77bcf86cd799439012/contacts?page=1&page_size=500"
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
const headers = { "X-API-Key": "your_api_key_here" };
const workbookId = "507f1f77bcf86cd799439012";

// Get all engagers (comments + reactions)
const engagersResponse = await fetch(
  `https://production.viacurrent.com/api/engagers/workbook/${workbookId}?page=1&page_size=100`,
  { headers },
);
const engagers = await engagersResponse.json();

// Get deduplicated contacts
const contactsResponse = await fetch(
  `https://production.viacurrent.com/api/engagers/workbook/${workbookId}/contacts?page=1&page_size=500`,
  { headers },
);
const contacts = await contactsResponse.json();
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import httpx

headers = {'X-API-Key': 'your_api_key_here'}
workbook_id = '507f1f77bcf86cd799439012'

# Get all engagers (comments + reactions)
engagers = httpx.get(
    f'https://production.viacurrent.com/api/engagers/workbook/{workbook_id}',
    headers=headers,
    params={'page': 1, 'page_size': 100},
).json()

# Get deduplicated contacts
contacts = httpx.get(
    f'https://production.viacurrent.com/api/engagers/workbook/{workbook_id}/contacts',
    headers=headers,
    params={'page': 1, 'page_size': 500},
).json()
```

  </TabItem>
</Tabs>

---

## Create a Workbook

Create a new temporary workbook to extract interactions from a post.

```http
POST /api/workbooks
```

### Request Body

```json
{
  "workspace_id": "507f1f77bcf86cd799439013",
  "post_url": "https://www.social.com/feed/update/urn:li:activity:...",
  "data_types": ["comment", "reaction"],
  "webhook_url": "https://customer.com/callback"
}
```

| Field          | Type   | Required | Description                                                                          |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------ |
| `workspace_id` | string | Yes      | The workspace ID                                                                     |
| `post_url`     | string | Yes      | Post URL                                                                             |
| `data_types`   | array  | Yes      | Types of data to extract: `comment`, `reaction` (case-insensitive; post data is always included) |
| `webhook_url`  | string | No       | HTTPS URL called when this run completes, may be retried on failure (max 1000 chars) |

### Response

Returns a run ID for tracking the extraction progress, and a workbook ID for retrieving the data.

```json
{
  "run_id": "507f1f77bcf86cd799439099",
  "status": "queued",
  "workbook_id": "507f1f77bcf86cd799439012"
}
```

| Field | Description |
|-------|-------------|
| `run_id` | Stable ID for this extraction attempt. Use it with `GET /api/workbooks/runs/{run_id}`. |
| `status` | Initial run status, usually `queued`. |
| `workbook_id` | Temporary workbook ID used to fetch engagers or contacts after completion. |

**Status values:**

- `queued` - Run is queued and waiting for a workspace execution slot
- `running` - Run is currently executing
- `success` - Extraction complete
- `success_credits_exhausted` - Extraction completed, but the workspace ran out of credits
- `failed` - Extraction failed

### Webhook Callbacks

If you provide a `webhook_url` when creating a workbook run, we'll send a completion callback to that URL when the extraction finishes, whether it succeeds or fails.

:::note Not the same as Webhooks
This callback is the per-run completion notification for Workbooks API requests. It is separate from the platform's broader [Webhooks integration](./../integrations/webhooks.md).
:::

#### Delivery

- `webhook_url` must be an `https://` URL.
- We send an HTTP `POST` request with a JSON payload.
- A `2xx` response is treated as successful delivery.
- If your endpoint does not respond within 5 seconds, or returns a non-`2xx` status code, the callback is considered failed.
- If delivery fails, we retry the callback once after 30 seconds.
- Because a callback may be delivered more than once, your endpoint should process callbacks idempotently.

**Payload example:**

```json
{
  "schedule_id": null,
  "workbook_id": "507f1f77bcf86cd799439012",
  "run_id": "507f1f77bcf86cd799439099",
  "status": "success",
  "started_at": "2025-01-15T10:30:00Z",
  "completed_at": "2025-01-15T10:33:00Z",
  "duration_ms": 180000,
  "post_url": "https://www.social.com/posts/example_activity-1234",
  "post_urn": "urn:li:activity:1234",
  "items_collected": 42,
  "items_available": 60,
  "credits_consumed": 43.0,
  "credits_exhausted": false,
  "counts": {
    "posts": 1,
    "comments": 12,
    "reactions": 30,
    "raw_engagements": 42,
    "unique_contacts": 35
  },
  "results_expire_at": "2025-01-15T22:30:00Z",
  "error": null
}
```

Webhook payloads and run status responses share the same core run fields. The example above shows a completed immediate-run webhook payload: `schedule_id` is `null` for immediate workbook webhooks and set to the originating schedule ID for scheduled workbook runs. Polling responses may omit fields whose value is `null`. Counts, `post_url`, and `results_expire_at` are populated after the run reaches a terminal status, so in-progress polling responses may omit them. Use `credits_exhausted: true` or `status: "success_credits_exhausted"` to detect partial results caused by credit limits.

### Rate Limiting

- **30 requests per minute** per API key

---

## Schedule a Workbook Run

Schedule a future workbook extraction for a single post. Scheduled runs use the same temporary workbook and [Engagers API](./engagers.md) retrieval flow as immediate `POST /api/workbooks` runs.

```http
POST /api/workbooks/schedules
```

:::warning Completion Webhook Required
Scheduled workbook runs require `webhook_url`. The dispatched workbook is temporary and expires 12 hours after dispatch, so the webhook is the reliable way to know when results are ready.
:::

### Request Body

```json
{
  "workspace_id": "507f1f77bcf86cd799439013",
  "post_url": "https://www.social.com/feed/update/urn:li:activity:1234567890",
  "data_types": ["comment", "reaction"],
  "scheduled_at": "2026-05-13T10:00:00Z",
  "webhook_url": "https://customer.com/callback",
  "idempotency_key": "optional-customer-key"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `workspace_id` | string | Yes | The workspace ID |
| `post_url` | string | Yes | LinkedIn post URL |
| `data_types` | array | Yes | Types of data to extract: `comment`, `reaction` (case-insensitive; post data is always included) |
| `scheduled_at` | string | Yes | UTC ISO 8601 timestamp. Must be at least 60 seconds in the future and no more than 30 days ahead |
| `webhook_url` | string | Yes | HTTPS URL called when the dispatched run completes; delivery may be retried, so handlers should be idempotent (max 1000 chars) |
| `idempotency_key` | string | No | Customer-supplied key scoped to the workspace. Replays return the original schedule instead of creating a duplicate |

### Response

First-time creation returns `201 Created`. If `idempotency_key` matches an existing schedule in the same workspace, the API returns `200 OK` with the original schedule response.

```json
{
  "schedule_id": "65aaa1112223334445556666",
  "status": "scheduled",
  "scheduled_at": "2026-05-13T10:00:00Z",
  "dispatcher_pickup_window": {
    "from": "2026-05-13T10:00:00Z",
    "to": "2026-05-13T10:04:00Z"
  }
}
```

`dispatcher_pickup_window` is the expected scheduler pickup window. Dispatch is best-effort and can slip under worker load; completion also depends on workbook queue wait and run duration.

### List Schedules

```http
GET /api/workbooks/schedules?workspace_id=507f1f77bcf86cd799439013&page=1&page_size=50
```

| Query parameter | Type | Required | Description |
|-----------------|------|----------|-------------|
| `workspace_id` | string | Yes | Workspace ID |
| `status` | string | No | Filter by `scheduled`, `dispatching`, `dispatched`, `cancelled`, or `failed` |
| `page` | integer | No | Page number, default `1` |
| `page_size` | integer | No | Items per page, default `50`, max `100` |
| `snapshot_time` | string | No | ISO 8601 timestamp used to keep pagination stable across requests |

:::tip Consistent pagination
To paginate over a stable snapshot, request page 1 without `snapshot_time`, then reuse the `snapshot_time` returned in that response on page 2 and later requests. Do not generate a new timestamp for each page, or you may paginate over a moving result set.

If the timestamp includes a timezone offset such as `+00:00`, URL-encode the `+` as `%2B` when constructing query strings manually, for example `2026-05-08T12:05:00%2B00:00`. A `Z` suffix does not need this encoding.
:::

```json
{
  "items": [
    {
      "schedule_id": "65aaa1112223334445556666",
      "workspace_id": "507f1f77bcf86cd799439013",
      "post_url": "https://www.social.com/feed/update/urn:li:activity:1234567890",
      "post_urn": "urn:li:activity:1234567890",
      "data_types": ["comment", "reaction"],
      "webhook_url": "https://customer.com/callback",
      "scheduled_at": "2026-05-13T10:00:00Z",
      "status": "scheduled",
      "workbook_id": null,
      "run_id": null,
      "dispatching_at": null,
      "completed_at": null,
      "error_message": null,
      "idempotency_key": "optional-customer-key",
      "created_at": "2026-05-08T12:00:00Z",
      "updated_at": "2026-05-08T12:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "page_size": 50,
  "pages": 1,
  "snapshot_time": "2026-05-08T12:05:00Z"
}
```

### Get a Schedule

```http
GET /api/workbooks/schedules/{schedule_id}
```

Returns the same schedule object used in the list response.

### Cancel a Schedule

```http
DELETE /api/workbooks/schedules/{schedule_id}
```

Cancellation is allowed before dispatch.

| Current status | Result |
|----------------|--------|
| `scheduled` | Returns `200 OK` with the schedule changed to `cancelled` |
| `cancelled` / `failed` | Returns `200 OK` idempotently with the current row |
| `dispatching` | Returns `409 Conflict` with current status and any known `run_id` / `workbook_id` |
| `dispatched` | Returns `409 Conflict` with `run_id` and `workbook_id`; cancelling an already-created workbook run is not part of this API |

Conflict response example:

```json
{
  "detail": {
    "schedule_id": "65aaa1112223334445556666",
    "status": "dispatched",
    "run_id": "507f1f77bcf86cd799439099",
    "workbook_id": "507f1f77bcf86cd799439012",
    "message": "schedule_in_status_dispatched"
  }
}
```

The conflict body is structured so clients can decide whether to wait, inspect the dispatched run, or stop retrying. `message` contains the conflict reason returned by the API.

### Scheduled Run Completion

When the schedule dispatches, the API creates a temporary workbook and a real workbook run. A completion webhook is sent when that run reaches a terminal status, using the same payload documented in [Webhook Callbacks](#webhook-callbacks). Delivery may be retried, so webhook handlers should be idempotent. The payload includes `schedule_id`, `workbook_id`, `run_id`, summary counts, credit usage, and `results_expire_at` so your automation can decide whether to fetch engagers or contacts.

If the workspace has no credits at dispatch time, the schedule is still dispatched. The run completes as `success_credits_exhausted` if credits are still unavailable when the worker runs, and the completion webhook includes `credits_exhausted: true`.

### Rate Limiting

- **30 requests per minute** per API key for `POST /api/workbooks/schedules`
- **60 requests per minute** per API key for `GET /api/workbooks/schedules` and `GET /api/workbooks/schedules/{schedule_id}`
- **30 requests per minute** per API key for `DELETE /api/workbooks/schedules/{schedule_id}`

---

## Get Run Status

Monitor the progress of one workbook extraction run.

```http
GET /api/workbooks/runs/{run_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `run_id` | string | The run ID returned from workbook creation |

### Response

Polling responses may omit fields whose value is `null`. The in-progress example below is an immediate workbook run, so `schedule_id` is omitted. The completed example is a scheduled workbook run; immediate completed runs return the same shape without `schedule_id`.

<Tabs>
<TabItem value="running" label="In Progress">

```json
{
  "workbook_id": "507f1f77bcf86cd799439012",
  "run_id": "507f1f77bcf86cd799439099",
  "status": "running",
  "started_at": "2024-01-15T10:30:00Z",
  "items_collected": 0,
  "items_available": 0,
  "credits_consumed": 0.0,
  "credits_exhausted": false,
  "completed_at": null,
  "duration_ms": null,
  "error": null
}
```

</TabItem>
<TabItem value="success" label="Completed (Scheduled)">

```json
{
  "schedule_id": "65aaa1112223334445556666",
  "workbook_id": "507f1f77bcf86cd799439012",
  "run_id": "507f1f77bcf86cd799439099",
  "status": "success",
  "started_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:33:00Z",
  "duration_ms": 180000,
  "post_url": "https://www.social.com/posts/example_activity-1234",
  "post_urn": "urn:li:activity:1234",
  "items_collected": 42,
  "items_available": 60,
  "credits_consumed": 43.0,
  "credits_exhausted": false,
  "counts": {
    "posts": 1,
    "comments": 12,
    "reactions": 30,
    "raw_engagements": 42,
    "unique_contacts": 35
  },
  "results_expire_at": "2024-01-15T22:30:00Z",
  "error": null
}
```

</TabItem>
<TabItem value="failed" label="Failed">

```json
{
  "workbook_id": "507f1f77bcf86cd799439012",
  "run_id": "507f1f77bcf86cd799439099",
  "status": "failed",
  "started_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:35:00Z",
  "duration_ms": 300000,
  "error": "Post not found or access denied"
}
```

</TabItem>
</Tabs>

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
  https://production.viacurrent.com/api/workbooks/runs/507f1f77bcf86cd799439099
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const runId = "507f1f77bcf86cd799439099";
const headers = { "X-API-Key": "your_api_key_here" };

// Poll for completion
let workbookId;
while (true) {
  const response = await fetch(
    `https://production.viacurrent.com/api/workbooks/runs/${runId}`,
    { headers },
  );
  const data = await response.json();

  if (data.status === "success" || data.status === "success_credits_exhausted") {
    workbookId = data.workbook_id;
    break;
  }
  if (data.status === "failed") {
    throw new Error(data.error || "Workbook extraction failed");
  }

  await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds
}

console.log(`Workbook ID: ${workbookId}`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx
import time

run_id = "507f1f77bcf86cd799439099"
headers = {"X-API-Key": "your_api_key_here"}

# Poll for completion
while True:
    response = httpx.get(
        f"https://production.viacurrent.com/api/workbooks/runs/{run_id}",
        headers=headers,
    )
    data = response.json()

    if data["status"] in {"success", "success_credits_exhausted"}:
        workbook_id = data["workbook_id"]
        break
    if data["status"] == "failed":
        raise RuntimeError(data.get("error", "Workbook extraction failed"))

    time.sleep(10)  # Wait 10 seconds before checking again

```

</TabItem>
</Tabs>

### Rate Limiting

- **60 requests per minute** per API key

### Workbook ID Status Compatibility

`GET /api/workbooks/{workbook_id}/run` remains available for compatibility, but it returns the latest run for that workbook. Prefer `GET /api/workbooks/runs/{run_id}` for deterministic polling.

---

## Error Responses

#### 400 Bad Request

```json
{
  "detail": "This operation is only supported for temporary workbooks."
}
```

**Common causes:**

- Invalid post URL format
- Missing required fields

**Solution:** Verify your post URL is valid and all required fields are provided.

#### 403 Forbidden

```json
{
  "detail": "No access to workspace"
}
```

**Solution:** Verify you have access to the workspace ID you're using.

#### 422 Validation Error

```json
{
  "detail": "Invalid post URL format"
}
```

**Solution:** Check that your post URL format is correct. Valid formats:

- `https://www.social.com/posts/username_activity-1234567890`
- `https://www.social.com/feed/update/urn:li:activity:...`

#### 429 Too Many Requests

```json
{
  "detail": "Rate limit exceeded"
}
```

**Solution:** Wait before making additional requests. POST requests are limited to 30/minute.

---

## Important Notes

### 12-Hour Data Window

Workbook data expires after 12 hours. Make sure to:

- Download all required data within this timeframe
- Save the workbook ID immediately after creation
- Extract all needed information via the [Engagers API](./engagers.md) before expiration

### Run Limitations

- Public requests create a fresh temporary workbook for each run
- Up to two workbook runs per workspace execute at the same time; additional runs remain queued
- Extraction typically takes 1-3 minutes depending on post size
- Large posts (1000+ interactions) may take longer

---

## Next Steps

Once your workbook extraction is complete:

- [Retrieve engagers](./engagers.md#workbook-engagers) — paginated comments and reactions
- [Retrieve contacts](./engagers.md#workbook-contacts) — deduplicated contact list with enrichment data
