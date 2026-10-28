---
sidebar_label: MCP
description: Use Jungler from Claude, ChatGPT, Claude Code, Cursor or any MCP client. Search creators, see who engages with posts, and collect engagers from the chat.
keywords:
    - mcp
    - claude connector
    - chatgpt
    - ai agents
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MCP

Use Jungler from your AI assistant: Claude, ChatGPT, Claude Code, Codex, Cursor or any MCP client.

## Setup

Add Jungler as a connector with this URL, then sign in and pick your workspace:

```
https://mcp.jungler.ai/
```

<Tabs>
  <TabItem value="claude" label="Claude" default>
    In Claude, open [**Customize > Connectors**](https://claude.ai/customize/connectors), click **Add custom connector**, paste the URL and click **Connect**.
  </TabItem>
  <TabItem value="chatgpt" label="ChatGPT">
    In ChatGPT, open **Plugins > Add custom MCP server**, set authentication to **OAuth**, paste the URL and click **Create**.
  </TabItem>
  <TabItem value="claude-code" label="Claude Code">
    Run `claude mcp add --transport http jungler https://mcp.jungler.ai/`, then `/mcp` and choose **Authenticate**.
  </TabItem>
  <TabItem value="other" label="Other">
    Go to [**Settings > MCP & API**](https://app.jungler.ai/settings/mcp-api) for Codex, Cursor, VS Code and one-click installs.
  </TabItem>
</Tabs>

Signals tools work on any paid plan. Creator search needs Explorer or higher.

## Playbooks

Ask in plain words. A few to start with:

| Playbook | Ask |
|---|---|
| **Find creators** | *"Find creators whose engagers are mostly VPs of Sales in Germany."* |
| **Post engagers** | *"Who commented on this post?"* and paste the post URL. |
| **Competitor engagers** | *"Which CTOs engaged with our competitor's page this month?"* |
| **Shortlists** | *"Save these five creators to my Q3 sponsorship list."* |

Collecting new data uses credits. Bigger collections ask you first.

## Disconnect

Go to [**Settings > MCP & API**](https://app.jungler.ai/settings/mcp-api) and revoke the connection.
