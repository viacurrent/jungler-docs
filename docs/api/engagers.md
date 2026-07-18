---
description: Engagers API reference — fetch unified, deduplicated LinkedIn post engagers with enriched contact data from both signals and workbooks.
---

# Engagers API

The Engagers API provides unified access to post interactions (comments, reactions) and deduplicated contact information from both signals and workbooks.

:::note New (2026-07)
Engager, contact, and post responses now include `email` and `email_status` fields, and these endpoints support a new `email_status` filter. See [Email status](#email-status) for what each status means.
:::

:::info Authentication Required
All API requests require authentication. See [API Overview](./index.md#authentication) for details.
:::

:::note Data Retention
Engagers and contacts cover the last **180 days** of activity, based on the post's `posted_at` timestamp. Engagements on posts older than 180 days are archived automatically and no longer returned; deduplicated contact stats (`stats.comments`, `stats.reactions`) reflect only the engagements still within this window.
:::

## Post Time Period Buffer

:::note
`post_time_period` uses a fixed 1-day ingestion-lag buffer around each cutoff. Effective publish-time windows are `day` = 2 days, `week` = 8 days, `month` = 32 days, and `three_months` = 91 days from request time.
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
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp; stabilizes record existence across pages |
| `engagement_type` | string | *(all)* | Filter by type: `COMMENT` or `REACTION` |
| `post_time_period` | string | *(all)* | Restrict to engagements on posts published in the named recent period bucket: `day`, `week`, `month`, or `three_months`. Applies the [standard ingestion-lag buffer](#post-time-period-buffer). Omit to include the full 180-day retention window |
| `email_status` | string | *(all)* | Filter by email status: comma-separated `found`, `not_found`, `pending`. Invalid values return 400. |

### Response

```json
{
  "items": [
    {
      "engagement_type": "COMMENT",
      "urn": "urn:li:comment:(activity:123,456)",
      "post_url": "https://www.social.com/feed/update/urn:li:activity:123",
      "jungler_post_id": "507f1f77bcf86cd799439011",
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
        "email": "jane.smith@techco.com",
        "email_status": "found",
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
      "jungler_post_id": "507f1f77bcf86cd799439011",
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
        "email": null,
        "email_status": "not_found",
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
| `jungler_post_id` | string \| null | Jungler ID of the post that was engaged with |
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
| `email` | string \| null | Work email if found (see [Email status](#email-status) below) |
| `email_status` | string | `found`, `not_found`, or `pending` — see [Email status](#email-status) |
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

#### Email status

Every author and contact carries an `email_status` describing the state of work-email discovery. `email` is never returned without `email_status`.

- `found` — an email was discovered; `email` is populated.
- `not_found` — discovery finished with no email; `email` is empty. Company authors and profiles we cannot resolve always settle on `not_found` once processed.
- `pending` — discovery is still running while enrichment is in progress; `email` is empty for now.

Treat an empty `email` with a `pending` status as transient — it may resolve later. Treat an empty `email` with a `not_found` status as terminal.

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

## Post Engagers

Retrieve paginated engagers (commenters and reactors) for a single signal post. Engagers are sorted by capture time (`created_at`) descending.

Pair this with the [Posts API](./posts.md)'s `has_engagement_since` parameter to incrementally pull only newly-captured engagement without re-scanning posts that haven't changed — fetch the changed posts there, then call this endpoint with `captured_after` to pull just their new engagers.

```http
GET /api/engagers/post/{post_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `post_id` | string | The post ID — the `jungler_post_id` returned on engager items, or the post `_id` from the [Posts API](./posts.md) |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `workspace_id` | string | *(required)* | Workspace ID that owns this post |
| `page` | integer | `1` | Page number (1-indexed) |
| `page_size` | integer | `100` | Items per page (1-500) |
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp; stabilizes record existence across pages |
| `engagement_type` | string | *(all)* | Filter by type: `COMMENT` or `REACTION` |
| `captured_after` | string | *(optional)* | Exclusive lower-bound ISO 8601 UTC timestamp for engager capture time (`created_at`). Pass the `last_engagement_at` from [`GET /api/posts`](./posts.md) to incrementally sync only newly-captured engagers — safe against late-arriving data |
| `captured_before` | string | *(optional)* | Inclusive upper-bound ISO 8601 UTC timestamp for engager capture time |
| `email_status` | string | *(all)* | Filter by email status: comma-separated `found`, `not_found`, `pending`. Invalid values return 400. See [Email status](#email-status). |

### Response

Identical in shape to the [Signal Engagers response](#response) — a page of engager items, each with a nested `author` object. The `author` is abbreviated below for brevity.

```json
{
  "items": [
    {
      "engagement_type": "COMMENT",
      "urn": "urn:li:comment:(activity:123,456)",
      "post_url": "https://www.social.com/feed/update/urn:li:activity:123",
      "jungler_post_id": "507f1f77bcf86cd799439011",
      "author": {
        "name": "Jane Smith",
        "first_name": "Jane",
        "last_name": "Smith",
        "urn": "urn:li:member:789",
        "username": "janesmith",
        "profile_url": "https://social.com/in/janesmith",
        "profile_type": "user",
        "company_name": "TechCo",
        "company_website": "techco.com",
        "email": "jane.smith@techco.com",
        "email_status": "found",
        "title": "VP Engineering",
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
    }
  ],
  "total": 42,
  "page": 1,
  "page_size": 100,
  "pages": 1,
  "snapshot_time": "2024-01-15T12:00:00.000000+00:00"
}
```

### Response Fields

The response reuses the [Signal Engagers](#response) definitions: each item is an [Engager Item](#engager-item) with a nested [`author`](#author-fields) object (including `email` and `email_status`). The example above abbreviates the `author` object — it carries the full [Author Fields](#author-fields) set.

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# All engagers for a post
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/post/507f1f77bcf86cd799439011?workspace_id=507f1f77bcf86cd799439013&page=1&page_size=100"

# Only engagers captured after a given time (incremental sync)
curl -H "X-API-Key: your_api_key_here" \
     "https://production.viacurrent.com/api/engagers/post/507f1f77bcf86cd799439011?workspace_id=507f1f77bcf86cd799439013&captured_after=2024-01-15T10:00:00Z"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const headers = { 'X-API-Key': 'your_api_key_here' };
const postId = '507f1f77bcf86cd799439011';
const workspaceId = '507f1f77bcf86cd799439013';

const url = new URL(`https://production.viacurrent.com/api/engagers/post/${postId}`);
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
post_id = "507f1f77bcf86cd799439011"

response = httpx.get(
    f"https://production.viacurrent.com/api/engagers/post/{post_id}",
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

:::note Signal contacts vs. workbook contacts
Signal contacts are deduplicated across the full 180-day retention window of engagements available for the signal. Workbook contacts are deduplicated across all engagements collected for the workbook that still fall within the 180-day retention window. Use `post_time_period` to narrow either to a shorter window.
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
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp; stabilizes record existence across pages |
| `activity_filter` | string | *(all)* | Filter by activity: `commenters`, `reactors`, or comma-separated combinations |
| `post_time_period` | string | *(all)* | Restrict to contacts who engaged with posts published in the named recent period bucket: `day`, `week`, `month`, or `three_months`. Applies the [standard ingestion-lag buffer](#post-time-period-buffer). When set, this filter affects which contacts are returned and scopes `stats.comments` / `stats.reactions` to that period. Omit to include the full 180-day retention window |
| `email_status` | string | *(all)* | Filter by email status: comma-separated `found`, `not_found`, `pending`. Invalid values return 400. |

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
      "email": "jane.smith@techco.com",
      "email_status": "found",
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
| `stats` | object | Engagement counts: `{ "comments": 3, "reactions": 1 }`. When `post_time_period` is set, these counts are scoped to that period; otherwise they reflect the full 180-day retention window. |
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
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp; stabilizes record existence across pages |
| `engagement_type` | string | *(all)* | Filter by type: `COMMENT` or `REACTION` |
| `post_time_period` | string | *(all)* | Restrict to engagements on posts published in the named recent period bucket: `day`, `week`, `month`, or `three_months`. Applies the [standard ingestion-lag buffer](#post-time-period-buffer). Omit to include the full 180-day retention window |
| `email_status` | string | *(all)* | Filter by email status: comma-separated `found`, `not_found`, `pending`. Invalid values return 400. |

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
| `snapshot_time` | string | current time | ISO 8601 snapshot timestamp; stabilizes record existence across pages |
| `activity_filter` | string | *(all)* | Filter by activity: `commenters`, `reactors`, or comma-separated combinations |
| `post_time_period` | string | *(all)* | Restrict to contacts who engaged with posts published in the named recent period bucket: `day`, `week`, `month`, or `three_months`. Applies the [standard ingestion-lag buffer](#post-time-period-buffer). When set, this filter affects which contacts are returned and scopes `stats.comments` / `stats.reactions` to that period. Omit to include the full 180-day retention window |
| `email_status` | string | *(all)* | Filter by email status: comma-separated `found`, `not_found`, `pending`. Invalid values return 400. |

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
      "email": "jane.smith@techco.com",
      "email_status": "found",
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
| `stats` | object | Engagement counts: `{ "comments": 3, "reactions": 1 }`. When `post_time_period` is set, these counts are scoped to that period; otherwise they reflect the full 180-day retention window. |
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
| `snapshot_time` | string | Snapshot timestamp; stabilizes record existence across pages |

### Consistent Pagination

Reuse the `snapshot_time` from the first page across subsequent pages to keep the set of returned records stable — it fixes *which* records appear (by creation time). Results filtered by `email_status` are the exception; see the caution below.

:::caution Email status and pagination
`snapshot_time` stabilizes which records exist across pages, but a record's `email` and `email_status` can change after it is first created. As a result, a result set filtered by `email_status` may shift between pages — even when filtering on a terminal status (`found` or `not_found`). If you need a complete traversal, either restart pagination once enrichment has settled, or tolerate duplicate and skipped records and de-duplicate by `urn` where present — the engagement identifier for engagers, the member identifier for contacts.
:::

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
