# Posts API

The Posts API allows you to retrieve and filter posts collected by your searches.

:::info Authentication Required
All API requests require authentication. See [API Reference](/api#authentication) for details.
:::

## List Posts

Retrieve a paginated list of posts with extensive filtering options.

```http
GET /api/posts
```

### Query Parameters

#### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `workspace_id` | string | The workspace ID to fetch posts from |
| `search_ids` | string | Comma-separated list of search IDs to filter by |

#### Pagination Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (≥ 1) |
| `page_size` | integer | 100 | Items per page (1-500) |
| `snapshot_time` | string | current time | ISO 8601 timestamp for consistent pagination |

#### Sorting Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sort_by` | string | `posted_at` | Field to sort by: `posted_at`, `created_at`, or `weight` |
| `sort_direction` | string | `desc` | Sort direction: `asc` or `desc` |

#### Filter Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `match` | string | AI relevance classification: `relevant`, `not_relevant`, `unclassified`, or combinations (comma-separated). **Note:** Only works if AI filtering is configured for your searches. |
| `type` | string | Post types: `buying_intent`, `hiring`, `thought_leadership`, `lead_magnet`, `promotion`, `announcement`, `other` |
| `sentiment` | string | Sentiment: `positive`, `negative`, `neutral` |
| `author` | string | Comma-separated author types |
| `lang` | string | Comma-separated language codes (e.g., `en`, `es`, `fr`, `de`) |
| `created_after` | string | ISO 8601 date (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS) |
| `created_before` | string | ISO 8601 date (max 31 days range) |
| `country` | string | Comma-separated ISO country codes to include |
| `country_exclude` | string | Comma-separated ISO country codes to exclude |
| `function` | string | Functions: `ENG` (Engineering/IT), `PRD` (Product), `MKT` (Marketing), `SAL` (Sales), `FIN` (Finance), `OPS` (Operations), `HR` (Human Resources), `CS` (Customer Success), `LEG` (Legal), `DA` (Data/Analytics), `DSN` (Design/UX), `EDU` (Education/Academia), `AMB` (Ambiguous/Consultant), `GEN` (General Management), `UNMAPPED` |
| `function_exclude` | string | Functions to exclude (same values as above) |
| `authority` | string | Authority levels: `L` (Executive/C-Level), `M` (Middle Management), `S` (Individual Contributors), `XS` (Junior/Entry-Level), `NA` (Solopreneur/Freelancer), `UNMAPPED` |
| `authority_exclude` | string | Authority levels to exclude (same values as above) |
| `company_size` | string | Company sizes: `XXS` (1-10), `XS` (11-50), `S` (51-200), `M` (201-500), `L` (501-1000), `XL` (1001-5000), `XXL` (5001+), `UNMAPPED` |
| `company_size_exclude` | string | Company sizes to exclude (same values as above) |
| `company_industry` | string | Industries: `TECH_INFO_MEDIA`, `FINANCIAL_SERVICES`, `HEALTH_CARE`, `PROFESSIONAL_SERVICES`, `MANUFACTURING`, `RETAIL`, `EDUCATION`, `CONSTRUCTION`, `CONSUMER_SERVICES`, `ENTERTAINMENT`, `TRANSPORTATION_LOGISTICS`, `ACCOMMODATION_SERVICES`, `ADMINISTRATIVE_SERVICES`, `FARMING_RANCHING_FORESTRY`, `GOV_ADMIN`, `HOLDING_COMPANIES`, `OIL_GAS_MINING`, `REAL_ESTATE_EQUIPMENT`, `UTILITIES`, `WHOLESALE`, `UNMAPPED` |
| `company_industry_exclude` | string | Industries to exclude (same values as above) |

### Response

```json
{
  "items": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "url": "https://linkedin.com/feed/update/...",
      "urn": "urn:li:activity:...",
      "content": "Post content text...",
      "author": {
        "name": "John Doe",
        "profile_url": "https://linkedin.com/in/johndoe",
        "profile_image_url": "https://...",
        "description": "Software Engineer at Company",
        "username": "johndoe",
        "profile_type": "user",
        "country_code": "US",
        "country": "United States",
        "authority": "M",
        "function": "ENG",
        "company_size": "L",
        "company_industry": "Technology",
        "company_website": "https://example.com"
      },
      "posted_at": "2024-01-15T10:30:00Z",
      "reaction_count": 42,
      "comment_count": 8,
      "embedded_content": {
        "type": "article",
        "url": "https://example.com/article",
        "title": "Article Title",
        "content": "Preview text...",
        "image_url": "https://...",
        "thumbnail_url": "https://..."
      },
      "search_id": "507f1f77bcf86cd799439012",
      "workspace_id": "507f1f77bcf86cd799439013",
      "classification": {
        "type": "post",
        "lang": "en",
        "sentiment": "positive",
        "weight": 0.85
      },
      "created_at": "2024-01-15T10:35:00Z",
      "updated_at": "2024-01-15T10:35:00Z"
    }
  ],
  "total": 1234,
  "page": 1,
  "page_size": 100,
  "pages": 13,
  "snapshot_time": "2024-01-15T12:00:00Z"
}
```

### Rate Limiting

- **60 requests per minute** per API key

### Example Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/posts?workspace_id=507f1f77bcf86cd799439013&search_ids=507f1f77bcf86cd799439012&page=1&page_size=100&match=relevant&sentiment=positive&country=US,GB
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const url = new URL('https://production.viacurrent.com/api/posts');
url.searchParams.append('workspace_id', '507f1f77bcf86cd799439013');
url.searchParams.append('search_ids', '507f1f77bcf86cd799439012');
url.searchParams.append('page', '1');
url.searchParams.append('page_size', '100');
url.searchParams.append('match', 'relevant');
url.searchParams.append('sentiment', 'positive');
url.searchParams.append('country', 'US,GB');

const response = await fetch(url, {
  headers: {
    'X-API-Key': 'your_api_key_here'
  }
});

const posts = await response.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

url = "https://production.viacurrent.com/api/posts"
headers = {"X-API-Key": "your_api_key_here"}
params = {
    "workspace_id": "507f1f77bcf86cd799439013",
    "search_ids": "507f1f77bcf86cd799439012",
    "page": 1,
    "page_size": 100,
    "match": "relevant",
    "sentiment": "positive",
    "country": "US,GB"
}

response = httpx.get(url, headers=headers, params=params)
posts = response.json()
```

</TabItem>
</Tabs>

### Pagination Best Practices

For consistent pagination across pages:

1. Make your first request without `snapshot_time`
2. Save the `snapshot_time` value from the response
3. Use that same `snapshot_time` value for subsequent page requests

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
# Page 1
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/posts?workspace_id=...&search_ids=...&page=1

# Response includes: "snapshot_time": "2024-01-15T12:00:00Z"

# Page 2 - use the same snapshot_time
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/posts?workspace_id=...&search_ids=...&page=2&snapshot_time=2024-01-15T12:00:00Z
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const url = 'https://production.viacurrent.com/api/posts';
const headers = { 'X-API-Key': 'your_api_key_here' };

// Page 1
const params1 = new URLSearchParams({
  workspace_id: '...',
  search_ids: '...',
  page: '1'
});

const response1 = await fetch(`${url}?${params1}`, { headers });
const data1 = await response1.json();

// Get snapshot_time from response
const snapshotTime = data1.snapshot_time;

// Page 2 - use the same snapshot_time
const params2 = new URLSearchParams({
  workspace_id: '...',
  search_ids: '...',
  page: '2',
  snapshot_time: snapshotTime
});

const response2 = await fetch(`${url}?${params2}`, { headers });
const data2 = await response2.json();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

url = "https://production.viacurrent.com/api/posts"
headers = {"X-API-Key": "your_api_key_here"}

# Page 1
params = {"workspace_id": "...", "search_ids": "...", "page": 1}
response = httpx.get(url, headers=headers, params=params)
data = response.json()

# Get snapshot_time from response
snapshot_time = data["snapshot_time"]

# Page 2 - use the same snapshot_time
params = {
    "workspace_id": "...",
    "search_ids": "...",
    "page": 2,
    "snapshot_time": snapshot_time
}
response = httpx.get(url, headers=headers, params=params)
```

</TabItem>
</Tabs>

### Date Filtering

- Date range cannot exceed 31 days
- Use ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
- `created_after` must be before `created_before`

### Error Responses

#### 400 Bad Request
```json
{
  "detail": "invalid_search_id_format"
}
```

#### 403 Forbidden
```json
{
  "detail": "search_507f1f77bcf86cd799439012_not_in_workspace"
}
```

#### 429 Too Many Requests
```json
{
  "detail": "Rate limit exceeded"
}
```

---

## Filter Values Reference

### Post Types

| Value | Description |
|-------|-------------|
| `buying_intent` | Posts indicating purchase intent or evaluation |
| `hiring` | Job postings or hiring announcements |
| `thought_leadership` | Industry insights, opinions, expertise sharing |
| `lead_magnet` | Content offers, webinars, downloads |
| `promotion` | Product/service promotions |
| `announcement` | Company news, product launches |
| `other` | Uncategorized posts |

### Sentiment Values

| Value | Description |
|-------|-------------|
| `positive` | Positive tone or sentiment |
| `negative` | Negative tone or sentiment |
| `neutral` | Neutral or factual tone |

### Function Codes

| Code | Full Name | Description |
|------|-----------|-------------|
| `ENG` | Engineering/IT | Developers, Infrastructure, Security, QA, SRE |
| `PRD` | Product | Product Management |
| `MKT` | Marketing | Marketing roles |
| `SAL` | Sales | Account Executives, SDRs, Partnerships |
| `FIN` | Finance | Accounting, FP&A |
| `OPS` | Operations | RevOps, BizOps, Supply Chain |
| `HR` | Human Resources | Talent Acquisition, Recruiting, L&D |
| `CS` | Customer Success | Support, CX, Services |
| `LEG` | Legal | Counsel, Compliance |
| `DA` | Data/Analytics | Data Science, ML, Analytics, BI |
| `DSN` | Design/UX | Product Design, UX Research, UI |
| `EDU` | Education/Academia | Professors, Lecturers, Researchers |
| `AMB` | Ambiguous | Consultants, Advisors (context-dependent) |
| `GEN` | General Management | CEO, Founder, President, GM |
| `UNMAPPED` | Unknown | Function could not be determined |

### Authority Levels

| Code | Level | Description |
|------|-------|-------------|
| `L` | Executive | C-level, Founder, Owner, VP, Head of function |
| `M` | Middle Management | Manager, Team Lead, Department Manager |
| `S` | Individual Contributor | Standard roles, unclear authority |
| `XS` | Junior | Junior, Intern, Student, Entry-level |
| `NA` | Independent | Solopreneur, Consultant, Advisor, Freelancer |
| `UNMAPPED` | Unknown | Authority level could not be determined |

### Company Sizes

| Code | Range | Employees |
|------|-------|-----------|
| `XXS` | Nano | 1-10 |
| `XS` | Micro | 11-50 |
| `S` | Small | 51-200 |
| `M` | Medium | 201-500 |
| `L` | Large | 501-1,000 |
| `XL` | Enterprise | 1,001-5,000 |
| `XXL` | Mega | 5,001+ |
| `UNMAPPED` | Unknown | Size could not be determined |

### Industry Codes

| Code | Industry |
|------|----------|
| `TECH_INFO_MEDIA` | Technology, Information and Media |
| `FINANCIAL_SERVICES` | Financial Services |
| `HEALTH_CARE` | Hospitals and Health Care |
| `PROFESSIONAL_SERVICES` | Professional Services |
| `MANUFACTURING` | Manufacturing |
| `RETAIL` | Retail |
| `EDUCATION` | Education |
| `CONSTRUCTION` | Construction |
| `CONSUMER_SERVICES` | Consumer Services |
| `ENTERTAINMENT` | Entertainment Providers |
| `TRANSPORTATION_LOGISTICS` | Transportation, Logistics, Supply Chain |
| `ACCOMMODATION_SERVICES` | Accommodation Services |
| `ADMINISTRATIVE_SERVICES` | Administrative and Support Services |
| `FARMING_RANCHING_FORESTRY` | Farming, Ranching and Forestry |
| `GOV_ADMIN` | Government Administration |
| `HOLDING_COMPANIES` | Holding Companies |
| `OIL_GAS_MINING` | Oil, Gas, and Mining |
| `REAL_ESTATE_EQUIPMENT` | Real Estate and Equipment Rental |
| `UTILITIES` | Utilities |
| `WHOLESALE` | Wholesale |
| `UNMAPPED` | Unknown |
