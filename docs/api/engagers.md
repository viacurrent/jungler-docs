---
description: Engagers API reference — fetch unified, deduplicated LinkedIn post engagers with enriched contact data from both signals and workbooks.
---

# Engagers API

The Engagers API provides unified access to post interactions (comments, reactions) and deduplicated contact information from both signals and workbooks.

:::info Authentication Required
All API requests require authentication. See [API Overview](./index.md#authentication) for details.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Signal Engagers

Retrieve paginated engagers (commenters and reactors) for a signal. Only available for `user_profile` and `company_profile` signal types.

```http
GET /api/engagers/signal/{signal_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `signal_id` | string | The signal ID to retrieve engagers for |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `workspace_id` | string | *(required)* | Workspace ID that owns this signal |
| `page` | integer | `1` | Page number (1-indexed) |
| `page_size` | integer | `100` | Items per page (1-500) |
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp for consistent pagination |
| `engagement_type` | string | *(all)* | Filter by type: `COMMENT` or `REACTION` |

### Response

```json
{
  "items": [
    {
      "engagement_type": "COMMENT",
      "urn": "urn:li:comment:(activity:123,456)",
      "post_url": "https://www.social.com/feed/update/urn:li:activity:123",
      "author": {
        "name": "Jane Smith",
        "first_name": "Jane",
        "last_name": "Smith",
        "urn": "urn:li:member:789",
        "username": "janesmith",
        "profile_url": "https://social.com/in/janesmith",
        "profile_image_url": "https://...",
        "description": "VP Engineering at TechCo",
        "profile_type": "user",
        "summary": "Building great teams...",
        "company_name": "TechCo",
        "company_website": "techco.com",
        "title": "VP Engineering",
        "company_icon_url": "https://...",
        "loc_country": "United States",
        "loc_region": "NA",
        "loc_code": "US",
        "loc_city": "San Francisco",
        "loc_state": "California",
        "company_size": "L",
        "company_industry": "TECH_INFO_MEDIA",
        "company_hq_loc_country": "United States",
        "company_hq_loc_code": "US",
        "authority": "L",
        "function": "ENG"
      },
      "content": "Great insight! Thanks for sharing.",
      "comment_meta": {
        "is_reply": false,
        "replies": 2,
        "is_pinned": false,
        "is_edited": false
      },
      "reaction_type": null,
      "engaged_at": "2024-01-15T10:45:00Z"
    },
    {
      "engagement_type": "REACTION",
      "urn": "urn:li:like:(member:101,activity:123)",
      "post_url": "https://www.social.com/feed/update/urn:li:activity:123",
      "author": {
        "name": "Bob Johnson",
        "first_name": "Bob",
        "last_name": "Johnson",
        "urn": "urn:li:member:101",
        "username": "bobjohnson",
        "profile_url": "https://social.com/in/bobjohnson",
        "profile_image_url": "https://...",
        "description": "Sales Director",
        "profile_type": "user",
        "summary": null,
        "company_name": "Acme Corp",
        "company_website": "acme.com",
        "title": "Sales Director",
        "company_icon_url": null,
        "loc_country": "United Kingdom",
        "loc_region": "EU",
        "loc_code": "GB",
        "loc_city": "London",
        "loc_state": null,
        "company_size": "M",
        "company_industry": "PROFESSIONAL_SERVICES",
        "company_hq_loc_country": null,
        "company_hq_loc_code": null,
        "authority": "M",
        "function": "SAL"
      },
      "content": null,
      "comment_meta": null,
      "reaction_type": "LIKE",
      "engaged_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 150,
  "page": 1,
  "page_size": 100,
  "pages": 2,
  "snapshot_time": "2024-01-15T12:00:00.000000+00:00"
}
```

### Response Fields

#### Engager Item

| Field | Type | Description |
|-------|------|-------------|
| `engagement_type` | string | `COMMENT` or `REACTION` |
| `urn` | string | Engagement URN (dedup key) |
| `post_url` | string | URL of the post that was engaged with |
| `author` | object | Engager author details (see below) |
| `content` | string \| null | Comment text (null for reactions) |
| `comment_meta` | object \| null | Comment metadata (null for reactions) |
| `reaction_type` | string \| null | Reaction type (null for comments) |
| `engaged_at` | string | ISO 8601 timestamp of the engagement |

#### Author Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name |
| `first_name` | string \| null | First name |
| `last_name` | string \| null | Last name |
| `urn` | string \| null | Member URN |
| `username` | string \| null | Username |
| `profile_url` | string \| null | Profile URL |
| `profile_image_url` | string \| null | Profile image URL |
| `description` | string \| null | Headline/title |
| `profile_type` | string | `user` or `company` |
| `summary` | string \| null | About/summary section |
| `company_name` | string \| null | Current company name |
| `company_website` | string \| null | Company website domain |
| `title` | string \| null | Current job title |
| `company_icon_url` | string \| null | Company logo URL |
| `loc_country` | string \| null | Country name |
| `loc_region` | string \| null | Geographic region (NA, EU, AP) |
| `loc_code` | string \| null | ISO country code |
| `loc_city` | string \| null | City name |
| `loc_state` | string \| null | State/province name |
| `company_size` | string \| null | Company size category |
| `company_industry` | string \| null | Company industry |
| `company_hq_loc_country` | string \| null | Company HQ country |
| `company_hq_loc_code` | string \| null | Company HQ ISO country code |
| `authority` | string \| null | Authority level (L, M, S, XS, NA) |
| `function` | string \| null | Job function (ENG, MKT, SAL, etc.) |

#### Comment Metadata

| Field | Type | Description |
|-------|------|-------------|
| `is_reply` | boolean | Whether this is a reply to another comment |
| `replies` | integer | Number of replies to this comment |
| `is_pinned` | boolean | Whether the comment is pinned |
| `is_edited` | boolean | Whether the comment was edited |

#### Reaction Types

- `LIKE`
- `APPRECIATION`
- `EMPATHY`
- `INTEREST`
- `PRAISE`
- `ENTERTAINMENT`

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# All engagers
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/signal/507f1f77bcf86cd799439012?workspace_id=507f1f77bcf86cd799439013&page=1&page_size=100"

# Comments only
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/signal/507f1f77bcf86cd799439012?workspace_id=507f1f77bcf86cd799439013&engagement_type=COMMENT"

# Reactions only
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/signal/507f1f77bcf86cd799439012?workspace_id=507f1f77bcf86cd799439013&engagement_type=REACTION"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const headers = { 'X-API-Key': 'your_api_key_here' };
const signalId = '507f1f77bcf86cd799439012';
const workspaceId = '507f1f77bcf86cd799439013';

const url = new URL(`https://production.viacurrent.com/api/engagers/signal/${signalId}`);
url.searchParams.append('workspace_id', workspaceId);
url.searchParams.append('page', '1');
url.searchParams.append('page_size', '100');

const response = await fetch(url, { headers });
const data = await response.json();
console.log(`Total engagers: ${data.total}`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

headers = {"X-API-Key": "your_api_key_here"}
signal_id = "507f1f77bcf86cd799439012"

response = httpx.get(
    f"https://production.viacurrent.com/api/engagers/signal/{signal_id}",
    headers=headers,
    params={
        "workspace_id": "507f1f77bcf86cd799439013",
        "page": 1,
        "page_size": 100,
    },
)
data = response.json()
print(f"Total engagers: {data['total']}")
```

</TabItem>
</Tabs>

### Rate Limiting

- **60 requests per minute** per API key

---

## Signal Contacts

Retrieve paginated, deduplicated contacts from a signal. Each contact represents a unique person with aggregated engagement stats across all monitored posts. Only available for `user_profile` and `company_profile` signal types.

:::note Rolling 30-day window
Signal contacts are deduplicated over a **rolling 30-day window** — only engagements from the last ~30 days are included. Older engagements are archived automatically. This differs from workbook contacts, which are deduplicated across all collected data.
:::

```http
GET /api/engagers/signal/{signal_id}/contacts
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `signal_id` | string | The signal ID to retrieve contacts for |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `workspace_id` | string | *(required)* | Workspace ID that owns this signal |
| `page` | integer | `1` | Page number (1-indexed) |
| `page_size` | integer | `500` | Items per page (1-500) |
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp for consistent pagination |
| `activity_filter` | string | *(all)* | Filter by activity: `commenters`, `reactors`, or comma-separated combinations |

### Response

```json
{
  "items": [
    {
      "name": "Jane Smith",
      "first_name": "Jane",
      "last_name": "Smith",
      "urn": "urn:li:member:789",
      "profile_type": "user",
      "profile_url": "https://social.com/in/janesmith",
      "profile_image_url": "https://...",
      "description": "VP Engineering at TechCo",
      "username": "janesmith",
      "summary": "Building great teams...",
      "company_name": "TechCo",
      "company_website": "techco.com",
      "title": "VP Engineering",
      "company_icon_url": "https://...",
      "loc_country": "United States",
      "loc_region": "NA",
      "loc_code": "US",
      "loc_city": "San Francisco",
      "loc_state": "California",
      "company_size": "L",
      "company_industry": "TECH_INFO_MEDIA",
      "company_hq_loc_country": "United States",
      "company_hq_loc_code": "US",
      "authority": "L",
      "function": "ENG",
      "stats": {
        "comments": 3,
        "reactions": 1
      },
      "last_engaged_at": "2024-01-15T10:45:00Z"
    }
  ],
  "total": 87,
  "page": 1,
  "page_size": 500,
  "pages": 1,
  "snapshot_time": "2024-01-15T12:00:00.000000+00:00"
}
```

### Contact Fields

Contacts include the same [author fields](#author-fields) as engagers, plus:

| Field | Type | Description |
|-------|------|-------------|
| `stats` | object | Engagement counts: `{ "comments": 3, "reactions": 1 }` |
| `last_engaged_at` | string \| null | Most recent engagement timestamp |

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# All contacts
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/signal/507f1f77bcf86cd799439012/contacts?workspace_id=507f1f77bcf86cd799439013&page=1&page_size=500"

# Commenters only
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/signal/507f1f77bcf86cd799439012/contacts?workspace_id=507f1f77bcf86cd799439013&activity_filter=commenters"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const headers = { 'X-API-Key': 'your_api_key_here' };
const signalId = '507f1f77bcf86cd799439012';
const workspaceId = '507f1f77bcf86cd799439013';

const url = new URL(`https://production.viacurrent.com/api/engagers/signal/${signalId}/contacts`);
url.searchParams.append('workspace_id', workspaceId);
url.searchParams.append('page', '1');
url.searchParams.append('page_size', '500');

const response = await fetch(url, { headers });
const data = await response.json();
console.log(`Total contacts: ${data.total}`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

headers = {"X-API-Key": "your_api_key_here"}
signal_id = "507f1f77bcf86cd799439012"

response = httpx.get(
    f"https://production.viacurrent.com/api/engagers/signal/{signal_id}/contacts",
    headers=headers,
    params={
        "workspace_id": "507f1f77bcf86cd799439013",
        "page": 1,
        "page_size": 500,
    },
)
data = response.json()
print(f"Total contacts: {data['total']}")
```

</TabItem>
</Tabs>

### Rate Limiting

- **60 requests per minute** per API key

---

## Workbook Engagers

Retrieve paginated engagers (commenters and reactors) from a workbook.

```http
GET /api/engagers/workbook/{workbook_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `workbook_id` | string | The workbook ID to retrieve engagers from |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number (1-indexed) |
| `page_size` | integer | `100` | Items per page (1-500) |
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp for consistent pagination |
| `engagement_type` | string | *(all)* | Filter by type: `COMMENT` or `REACTION` |

### Response

Same format as [Signal Engagers response](#response).

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/workbook/507f1f77bcf86cd799439012?page=1&page_size=100"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const headers = { 'X-API-Key': 'your_api_key_here' };
const workbookId = '507f1f77bcf86cd799439012';

const url = new URL(`https://production.viacurrent.com/api/engagers/workbook/${workbookId}`);
url.searchParams.append('page', '1');
url.searchParams.append('page_size', '100');

const response = await fetch(url, { headers });
const data = await response.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

workbook_id = "507f1f77bcf86cd799439012"
response = httpx.get(
    f"https://production.viacurrent.com/api/engagers/workbook/{workbook_id}",
    headers={"X-API-Key": "your_api_key_here"},
    params={"page": 1, "page_size": 100},
)
data = response.json()
```

</TabItem>
</Tabs>

### Rate Limiting

- **60 requests per minute** per API key

---

## Workbook Contacts

Retrieve paginated, deduplicated contact information from a workbook. Each contact represents a unique person with aggregated engagement stats.

```http
GET /api/engagers/workbook/{workbook_id}/contacts
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `workbook_id` | string | The workbook ID to retrieve contacts from |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number (1-indexed) |
| `page_size` | integer | `500` | Items per page (1-500) |
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp for consistent pagination |
| `activity_filter` | string | *(all)* | Filter by activity: `commenters`, `reactors`, or comma-separated combinations |

### Response

```json
{
  "items": [
    {
      "name": "Jane Smith",
      "first_name": "Jane",
      "last_name": "Smith",
      "urn": "urn:li:member:789",
      "profile_type": "user",
      "profile_url": "https://social.com/in/janesmith",
      "profile_image_url": "https://...",
      "description": "VP Engineering at TechCo",
      "username": "janesmith",
      "summary": "Building great teams...",
      "company_name": "TechCo",
      "company_website": "techco.com",
      "title": "VP Engineering",
      "company_icon_url": "https://...",
      "loc_country": "United States",
      "loc_region": "NA",
      "loc_code": "US",
      "loc_city": "San Francisco",
      "loc_state": "California",
      "company_size": "L",
      "company_industry": "TECH_INFO_MEDIA",
      "company_hq_loc_country": "United States",
      "company_hq_loc_code": "US",
      "authority": "L",
      "function": "ENG",
      "stats": {
        "comments": 3,
        "reactions": 1
      },
      "last_engaged_at": "2024-01-15T10:45:00Z"
    }
  ],
  "total": 87,
  "page": 1,
  "page_size": 500,
  "pages": 1,
  "snapshot_time": "2024-01-15T12:00:00.000000+00:00"
}
```

### Contact Fields

Contacts include the same [author fields](#author-fields) as engagers, plus:

| Field | Type | Description |
|-------|------|-------------|
| `stats` | object | Engagement counts: `{ "comments": 3, "reactions": 1 }` |
| `last_engaged_at` | string \| null | Most recent engagement timestamp |

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# All contacts
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/workbook/507f1f77bcf86cd799439012/contacts?page=1&page_size=500"

# Commenters only
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/workbook/507f1f77bcf86cd799439012/contacts?activity_filter=commenters"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const headers = { 'X-API-Key': 'your_api_key_here' };
const workbookId = '507f1f77bcf86cd799439012';

const url = new URL(`https://production.viacurrent.com/api/engagers/workbook/${workbookId}/contacts`);
url.searchParams.append('page', '1');
url.searchParams.append('page_size', '500');

const response = await fetch(url, { headers });
const data = await response.json();
console.log(`Total contacts: ${data.total}`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

workbook_id = "507f1f77bcf86cd799439012"
response = httpx.get(
    f"https://production.viacurrent.com/api/engagers/workbook/{workbook_id}/contacts",
    headers={"X-API-Key": "your_api_key_here"},
    params={"page": 1, "page_size": 500},
)
data = response.json()
print(f"Total contacts: {data['total']}")
```

</TabItem>
</Tabs>

### Rate Limiting

- **60 requests per minute** per API key

---

## Pagination

All engager endpoints use the same pagination pattern as the [Posts API](./posts.md).

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `items` | array | Page of results |
| `total` | integer | Total number of matching items |
| `page` | integer | Current page number |
| `page_size` | integer | Items per page |
| `pages` | integer | Total number of pages |
| `snapshot_time` | string | Snapshot timestamp for consistent pagination |

### Consistent Pagination

For consistent results across pages, reuse the `snapshot_time` from the first page.

:::tip URL-encoding
The `snapshot_time` value contains a `+` character (e.g. `+00:00`). When passing it as a query parameter, make sure your HTTP client URL-encodes it — an unencoded `+` is interpreted as a space. Most HTTP libraries (Python `httpx`, JavaScript `fetch` with `URL`/`URLSearchParams`) handle this automatically, but watch out when constructing URLs manually in cURL or string concatenation.
:::

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# Page 1
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/signal/SIGNAL_ID?workspace_id=WS_ID&page=1&page_size=100"

# Response includes: "snapshot_time": "2024-01-15T12:00:00.000000+00:00"

# Page 2 - reuse snapshot_time (URL-encode the +)
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/signal/SIGNAL_ID?workspace_id=WS_ID&page=2&page_size=100&snapshot_time=2024-01-15T12:00:00.000000%2B00:00"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const headers = { 'X-API-Key': 'your_api_key_here' };
const baseUrl = 'https://production.viacurrent.com/api/engagers/signal/SIGNAL_ID';

// Page 1
const url1 = new URL(baseUrl);
url1.searchParams.set('workspace_id', 'WS_ID');
url1.searchParams.set('page', '1');
url1.searchParams.set('page_size', '100');

const response1 = await fetch(url1, { headers });
const data1 = await response1.json();
const snapshotTime = data1.snapshot_time;

// Page 2 - URLSearchParams encodes the + in snapshot_time automatically
const url2 = new URL(baseUrl);
url2.searchParams.set('workspace_id', 'WS_ID');
url2.searchParams.set('page', '2');
url2.searchParams.set('page_size', '100');
url2.searchParams.set('snapshot_time', snapshotTime);

const response2 = await fetch(url2, { headers });
const data2 = await response2.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

headers = {"X-API-Key": "your_api_key_here"}
base_url = "https://production.viacurrent.com/api/engagers/signal/SIGNAL_ID"

# Page 1
response = httpx.get(base_url, headers=headers, params={
    "workspace_id": "WS_ID", "page": 1, "page_size": 100
})
data = response.json()
snapshot_time = data["snapshot_time"]

# Page 2 - use the same snapshot_time
response = httpx.get(base_url, headers=headers, params={
    "workspace_id": "WS_ID", "page": 2, "page_size": 100,
    "snapshot_time": snapshot_time,
})
```

</TabItem>
</Tabs>

---

## Error Responses

#### 400 Bad Request
```json
{
  "detail": "invalid_signal_id_format"
}
```

```json
{
  "detail": "signal_type_does_not_have_engagers"
}
```

```json
{
  "detail": "invalid_engagement_type"
}
```

#### 403 Forbidden
```json
{
  "detail": "signal_not_in_workspace"
}
```

#### 429 Too Many Requests
```json
{
  "detail": "Rate limit exceeded"
}
```
