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

Returns an array of workspace objects with the authenticated user's membership information.

```json
[
  {
    "membership_id": "string",
    "workspace_id": "string",
    "workspace_name": "string",
    "user_role": "owner"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `membership_id` | string | Unique identifier for the user's membership in this workspace |
| `workspace_id` | string | Unique workspace identifier |
| `workspace_name` | string | Workspace name |
| `user_role` | string | Your role in the workspace |

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

const memberships = await response.json();

for (const membership of memberships) {
  console.log(`${membership.workspace_name} (${membership.user_role})`);
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

url = "https://production.viacurrent.com/api/workspaces"
headers = {"X-API-Key": "your_api_key_here"}

response = httpx.get(url, headers=headers)
memberships = response.json()

for membership in memberships:
    print(f"{membership['workspace_name']} ({membership['user_role']})")
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
