# Workspaces API

The Workspaces API allows you to list all workspaces that you have access to.

:::info Authentication Required
All API requests require authentication. See [API Reference](/api#authentication) for details.
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

## Next Steps

Once you have a workspace ID, you can:
- [List searches in a workspace](/api/searches)
- [Retrieve posts from searches](/api/posts)
- [Create workbooks for interaction extraction](/api/workbooks)
