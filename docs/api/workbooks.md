---
description: Workbooks API reference — create temporary workbooks to extract comments, reactions, and contact data from any LinkedIn post on demand.
---

# Workbooks API

The Workbooks API allows you to create temporary workbooks that extract post interactions (comments, reactions) and contact information from posts.

:::info Authentication Required
All API requests require authentication. See [API Overview](./index.md#authentication) for details.
:::

:::warning Data Expiration
Workbook data is stored in temporary workbooks that **expire after 12 hours**. Make sure to retrieve all data you need within this timeframe using the [Engagers API](./engagers.md).
:::

## Quick Start

Extract interactions from a post in 3 steps:

### 1. Create a Collection Task

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
  "task_id": "abc123-def456-ghi789",
  "status": "queued",
  "workbook_id": "507f1f77bcf86cd799439012"
}
```

### 2. Wait for Completion

The extraction typically takes 1-3 minutes. Poll the [task status](#get-task-status) endpoint until it completes, or provide a `webhook_url` in your request to receive a callback.

### 3. Retrieve Your Data

Once complete, use the workbook ID from the task result to access collected data via the [Engagers API](./engagers.md):

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

| Field          | Type   | Required | Description                                                                    |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------ |
| `workspace_id` | string | Yes      | The workspace ID                                                               |
| `post_url`     | string | Yes      | Post URL                                                                       |
| `data_types`   | array  | Yes      | Types of data to extract: `comment`, `reaction` (post data is always included) |
| `webhook_url`  | string | No       | HTTPS URL called once when this run completes (max 1000 chars)                 |

### Response

Returns a task ID for tracking the extraction progress, and a workbook ID for retrieving the data.

```json
{
  "task_id": "abc123-def456-ghi789",
  "status": "queued",
  "workbook_id": "507f1f77bcf86cd799439012"
}
```

**Status values:**

- `queued` - Task is queued
- `pending` - Celery task picked up, preparing
- `running` - Task is currently executing
- `success` - Extraction complete
- `failure` - Extraction failed

### Webhook Callbacks

If you provide a `webhook_url` when creating a workbook run, we'll POST to that URL exactly once when the extraction completes (either successfully or fails).

**Payload example:**

```json
{
  "workbook_id": "507f1f77bcf86cd799439012",
  "run_id": "507f1f77bcf86cd799439099",
  "status": "success",
  "started_at": "2025-01-15T10:30:00Z",
  "completed_at": "2025-01-15T10:35:00Z",
  "duration_ms": 300000,
  "error": null
}
```

### Rate Limiting

- **6 requests per minute** per API key

---

## Get Task Status

Monitor the progress of your workbook extraction task.

```http
GET /api/tasks/{task_id}/status
```

### Path Parameters

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `task_id` | string | The task ID returned from workbook creation |

### Response

<Tabs>
<TabItem value="pending" label="In Progress">

```json
{
  "task_id": "abc123-def456-ghi789",
  "status": "running"
}
```

</TabItem>
<TabItem value="success" label="Completed">

```json
{
  "task_id": "abc123-def456-ghi789",
  "status": "success",
  "completed_at": "2024-01-15T10:30:00Z",
  "result": {
    "workbook_id": "507f1f77bcf86cd799439012",
    "items_collected": 150,
    "success": true
  }
}
```

</TabItem>
<TabItem value="failure" label="Failed">

```json
{
  "task_id": "abc123-def456-ghi789",
  "status": "failure",
  "completed_at": "2024-01-15T10:35:00Z",
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
     https://production.viacurrent.com/api/tasks/abc123-def456-ghi789/status
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const taskId = "abc123-def456-ghi789";
const headers = { "X-API-Key": "your_api_key_here" };

// Poll for completion
let workbookId;
while (true) {
  const response = await fetch(
    `https://production.viacurrent.com/api/tasks/${taskId}/status`,
    { headers },
  );
  const data = await response.json();

  if (data.status === "success" || data.status === "failure") {
    workbookId = data.result?.workbook_id;
    break;
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

task_id = "abc123-def456-ghi789"
headers = {"X-API-Key": "your_api_key_here"}

# Poll for completion
while True:
    response = httpx.get(
        f"https://production.viacurrent.com/api/tasks/{task_id}/status",
        headers=headers
    )
    data = response.json()

    if data["status"] in ["success", "failure"]:
        break

    time.sleep(10)  # Wait 10 seconds before checking again

workbook_id = data["result"]["workbook_id"]
```

</TabItem>
</Tabs>

### Rate Limiting

- **60 requests per minute** per API key

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

#### 409 Conflict

```json
{
  "detail": "task_blocked_by_another_task"
}
```

**Cause:** A collection task is already running for this post.

**Solution:** Wait for the existing task to complete before creating a new one.

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

**Solution:** Wait before making additional requests. POST requests are limited to 6/minute.

---

## Important Notes

### 12-Hour Data Window

Workbook data expires after 12 hours. Make sure to:

- Download all required data within this timeframe
- Save the workbook ID immediately after creation
- Extract all needed information via the [Engagers API](./engagers.md) before expiration

### Task Limitations

- Only one extraction task can run per post at a time
- Extraction typically takes 1-3 minutes depending on post size
- Large posts (1000+ interactions) may take longer

---

## Next Steps

Once your workbook extraction is complete:

- [Retrieve engagers](./engagers.md#workbook-engagers) — paginated comments and reactions
- [Retrieve contacts](./engagers.md#workbook-contacts) — deduplicated contact list with enrichment data
