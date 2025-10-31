# Workbooks API

The Workbooks API allows you to extract post interactions (comments, reactions) and contact information from posts.

:::warning Data Expiration
Workbook data is stored in temporary workbooks that **expire after 12 hours**. Make sure to download all data you need within this timeframe.
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
       "post_url": "https://www.linkedin.com/posts/username_activity-1234567890",
       "data_types": ["comment", "reaction"],
       "workspace_id": "507f1f77bcf86cd799439011"
     }' \
     https://production.viacurrent.com/api/workbooks
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    'https://production.viacurrent.com/api/workbooks',
    headers={'X-API-Key': 'your_api_key_here'},
    json={
        'post_url': 'https://www.linkedin.com/posts/username_activity-1234567890',
        'data_types': ['comment', 'reaction'],
        'workspace_id': '507f1f77bcf86cd799439011'
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
  "status": "PENDING"
}
```

### 2. Wait for Completion

The extraction typically takes 1-3 minutes. The task runs asynchronously, so you can check back later or poll for status updates (if status endpoint is available).

### 3. Retrieve Your Data

Once complete, use the workbook ID to access the collected data:

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
# Get all contacts (deduplicated)
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/workbooks/507f1f77bcf86cd799439012/contacts

# Get comments
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/workbooks/507f1f77bcf86cd799439012/comments

# Get reactions
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/workbooks/507f1f77bcf86cd799439012/reactions
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import httpx

headers = {'X-API-Key': 'your_api_key_here'}
workbook_id = '507f1f77bcf86cd799439012'

# Get all contacts (deduplicated)
contacts = httpx.get(
    f'https://production.viacurrent.com/api/workbooks/{workbook_id}/contacts',
    headers=headers
).json()

# Get comments
comments = httpx.get(
    f'https://production.viacurrent.com/api/workbooks/{workbook_id}/comments',
    headers=headers
).json()

# Get reactions
reactions = httpx.get(
    f'https://production.viacurrent.com/api/workbooks/{workbook_id}/reactions',
    headers=headers
).json()
```

  </TabItem>
</Tabs>

---

### Create a Workbook

Create a new temporary workbook to extract interactions from a post.

```http
POST /api/workbooks
```

### Authentication

Requires an API key in the header:

```
X-API-Key: your_api_key_here
```

### Request Body

```json
{
  "workspace_id": "507f1f77bcf86cd799439013",
  "post_url": "https://www.linkedin.com/feed/update/urn:li:activity:...",
  "data_types": ["comment", "reaction"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `workspace_id` | string | Yes | The workspace ID |
| `post_url` | string | Yes | Post URL (see [supported formats](#supported-post-url-formats)) |
| `data_types` | array | Yes | Types of data to extract: `comment`, `reaction` (post data is always included) |

### Response

Returns a task ID for tracking the extraction progress.

```json
{
  "task_id": "abc123-def456-ghi789",
  "status": "PENDING"
}
```

**Status values:**
- `PENDING` - Task is queued
- `STARTED` - Extraction in progress
- `SUCCESS` - Extraction complete
- `FAILURE` - Extraction failed

### Rate Limiting

- **6 requests per minute** per API key

---

## Get Contacts

Retrieve deduplicated contact information from a workbook.

```http
GET /api/workbooks/{workbook_id}/contacts
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fields` | string | `name,profile_url` | Comma-separated fields to include |
| `activity_filter` | string | (all) | Filter by activity: `posters`, `commenters`, `reactors`, or combinations |

**Available fields:**
- `name` - Full name
- `first_name` - Parsed first name
- `last_name` - Parsed last name
- `urn` - Platform URN (Universal Resource Name)
- `profile_url` - Profile URL
- `profile_type` - Type of profile (user, company)
- `description` - Profile headline/description
- `profile_image_url` - Profile picture URL
- `stats` - All activity statistics
- `stats.posts` - Number of posts
- `stats.reactions` - Number of reactions
- `stats.comments` - Number of comments

### Response

```json
[
  {
    "name": "Jane Smith",
    "first_name": "Jane",
    "last_name": "Smith",
    "profile_url": "https://linkedin.com/in/janesmith",
    "profile_image_url": "https://...",
    "description": "Product Manager at Tech Corp",
    "stats": {
      "posts": 0,
      "reactions": 1,
      "comments": 3
    }
  }
]
```

### Rate Limiting

- **12 requests per minute** per API key

---

## Get Comments

Retrieve all comments from a workbook.

```http
GET /api/workbooks/{workbook_id}/comments
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `include_replies` | boolean | `true` | Include reply comments in results |

### Response

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "content": "Great insight! Thanks for sharing.",
    "author": {
      "name": "John Doe",
      "urn": "urn:li:person:...",
      "profile_url": "https://linkedin.com/in/johndoe",
      "profile_image_url": "https://..."
    },
    "posted_at": "2024-01-15T10:45:00Z",
    "meta": {
      "is_reply": false
    }
  }
]
```

### Rate Limiting

- **12 requests per minute** per API key

---

## Get Reactions

Retrieve all reactions from a workbook.

```http
GET /api/workbooks/{workbook_id}/reactions
```

### Response

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "reaction_type": "LIKE",
    "author": {
      "name": "John Doe",
      "urn": "urn:li:person:...",
      "profile_url": "https://linkedin.com/in/johndoe",
      "profile_image_url": "https://..."
    },
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

**Reaction types:**
- `LIKE`
- `CELEBRATE`
- `SUPPORT`
- `LOVE`
- `INSIGHTFUL`
- `FUNNY`

### Rate Limiting

- **12 requests per minute** per API key

---

## Example Workflow

### 1. Create an interaction run

```bash
curl -X POST "https://production.viacurrent.com/api/workbooks" \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "507f1f77bcf86cd799439013",
    "post_url": "https://www.linkedin.com/feed/update/urn:li:activity:...",
    "data_types": ["comment", "reaction"]
  }'
```

Response:
```json
{
  "task_id": "abc123-def456-ghi789",
  "status": "PENDING"
}
```

### 2. Wait for extraction to complete

Poll the task status (implementation depends on your task monitoring system).

### 3. Get contacts from the workbook

```bash
curl -X GET "https://production.viacurrent.com/api/workbooks/507f1f77bcf86cd799439014/contacts?fields=name,profile_url,stats&activity_filter=commenters,reactors" \
  -H "X-API-Key: your_api_key_here"
```

### 4. Get comments

```bash
curl -X GET "https://production.viacurrent.com/api/workbooks/507f1f77bcf86cd799439014/comments" \
  -H "X-API-Key: your_api_key_here"
```

### 5. Get reactions

```bash
curl -X GET "https://production.viacurrent.com/api/workbooks/507f1f77bcf86cd799439014/reactions" \
  -H "X-API-Key: your_api_key_here"
```

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
- `https://www.linkedin.com/posts/username_activity-1234567890`
- `https://www.linkedin.com/feed/update/urn:li:activity:...`

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
- Extract all needed information (contacts, comments, reactions) before expiration

### Task Limitations

- Only one extraction task can run per post at a time
- Extraction typically takes 1-3 minutes depending on post size
- Large posts (1000+ interactions) may take longer
