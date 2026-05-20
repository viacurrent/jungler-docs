---
description: Workspaces API reference — list every Jungler workspace your API key can access, with IDs needed for downstream signals and posts endpoints.
---

# Workspaces API

The Workspaces API allows you to list all workspaces that you have access to.

:::info Authentication Required
All API requests require authentication. See [API Overview](./index.md#authentication) for details.
:::

## List Workspaces

Get all workspaces for the authenticated user.

```http
GET /api/workspaces
```

### Response

Returns an array of workspace objects.

```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Marketing Team",
    "role": "admin",
    "created_at": "2024-01-10T08:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Sales Team",
    "role": "member",
    "created_at": "2024-01-12T10:30:00Z"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | string | Unique workspace identifier |
| `name` | string | Workspace name |
| `role` | string | Your role in the workspace: `admin`, `member`, `viewer` |
| `created_at` | string | ISO 8601 timestamp of when the workspace was created |

### Rate Limiting

- **30 requests per minute** per API key

### Example Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/workspaces
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch('https://production.viacurrent.com/api/workspaces', {
  headers: {
    'X-API-Key': 'your_api_key_here'
  }
});

const workspaces = await response.json();

for (const workspace of workspaces) {
  console.log(`${workspace.name} (${workspace.role})`);
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

url = "https://production.viacurrent.com/api/workspaces"
headers = {"X-API-Key": "your_api_key_here"}

response = httpx.get(url, headers=headers)
workspaces = response.json()

for workspace in workspaces:
    print(f"{workspace['name']} ({workspace['role']})")
```

</TabItem>
</Tabs>

### Use Cases

Use this endpoint to:
- Get workspace IDs for use with other API endpoints
- Display a list of available workspaces to users
- Check your access level in different workspaces

### Error Responses

#### 401 Unauthorized
```json
{
  "detail": "Invalid or missing API key"
}
```

#### 429 Too Many Requests
```json
{
  "detail": "Rate limit exceeded"
}
```

---

## Get Workspace Subscription

Get subscription and credit usage information for a specific workspace.

```http
GET /api/workspaces/{workspace_id}/subscription
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `workspace_id` | string | **Required**. The ID of the workspace. |

### Response

Returns a subscription info object.

```json
{
  "workspace_id": "507f1f77bcf86cd799439013",
  "plan": "pro",
  "credits_limit": 5000.0,
  "credits_used": 1500.0,
  "credits_remaining": 3500.0,
  "start_at": "2024-01-01T00:00:00Z",
  "end_at": "2024-02-01T00:00:00Z",
  "max_signal_count": 10,
  "max_team_size": 5
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `workspace_id` | string | Workspace identifier |
| `plan` | string | Current subscription plan |
| `credits_limit` | number | Credit limit for the current period |
| `credits_used` | number | Credits used in the current period |
| `credits_remaining` | number | Credits remaining in the current period |
| `start_at` | string | Start date of the current period |
| `end_at` | string | End date of the current period |
| `max_signal_count` | integer | Maximum number of active signals allowed |
| `max_team_size` | integer | Maximum number of team members allowed |

### Rate Limiting

- **30 requests per minute** per API key

### Example Request

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://production.viacurrent.com/api/workspaces/507f1f77bcf86cd799439013/subscription
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const workspaceId = '507f1f77bcf86cd799439013';
const response = await fetch(`https://production.viacurrent.com/api/workspaces/${workspaceId}/subscription`, {
  headers: {
    'X-API-Key': 'your_api_key_here'
  }
});

const subscription = await response.json();
console.log(`Plan: ${subscription.plan}, Remaining Credits: ${subscription.credits_remaining}`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

workspace_id = "507f1f77bcf86cd799439013"
url = f"https://production.viacurrent.com/api/workspaces/{workspace_id}/subscription"
headers = {"X-API-Key": "your_api_key_here"}

response = httpx.get(url, headers=headers)
subscription = response.json()

print(f"Plan: {subscription['plan']}, Remaining Credits: {subscription['credits_remaining']}")
```

</TabItem>
</Tabs>

### Error Responses

#### 401 Unauthorized
```json
{
  "detail": "Invalid or missing API key"
}
```

#### 403 Forbidden
```json
{
  "detail": "Not a member of this workspace"
}
```

#### 404 Not Found
```json
{
  "detail": "no_active_subscription"
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

Once you have a workspace ID, you can:
- [List signals in a workspace](./signals.md)
- [Retrieve posts from signals](./posts.md)
- [Create workbooks for interaction extraction](./workbooks.md)
