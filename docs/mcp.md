---
title: Jungler in Claude, ChatGPT and other AI assistants (MCP)
sidebar_label: AI Agents (MCP)
description: Connect Jungler to Claude, ChatGPT, Claude Code, Cursor and any MCP client. Search B2B creators, see who engages with LinkedIn posts, and collect engagers from the chat.
---

# Jungler in your AI assistant (MCP)

Jungler runs a remote [MCP](https://modelcontextprotocol.io) server, so you can use Jungler from Claude, ChatGPT, Claude Code, Codex, Cursor, VS Code or any other MCP client. Ask in plain words, for example:

- *"Find creators whose engagers are mostly VPs of Sales in Germany"*
- *"Who commented on this post? https://www.linkedin.com/posts/…"*
- *"Which CTOs engaged with our company page this month?"*
- *"Save these five creators to my Q3 sponsorship list"*

**Server URL:** `https://mcp.jungler.ai/`

## What you need

- A Jungler account. [Sign up](https://app.jungler.ai/signup) if you don't have one.
- A paid plan:
  - **Signals** (who engages with posts, profiles and keywords) works on every active paid plan, Starter included.
  - **Discovery** (searching and opening creators) needs Explorer or higher.

  Trials and lapsed plans can connect, but the tools reply that the plan doesn't include them. [Compare plans](https://jungler.ai/pricing).

## Connect

When you connect, your browser opens Jungler's sign-in and consent page. You sign in, pick the **workspace** the assistant may use, and approve. No API key is needed.

### Claude (claude.ai, Desktop, mobile)

1. In Claude, open [**Customize > Connectors**](https://claude.ai/customize/connectors) and click **Add custom connector**.
2. Name it *Jungler* and paste `https://mcp.jungler.ai/` as the URL.
3. Click **Connect**, sign in to Jungler and pick your workspace.

On Team and Enterprise plans, an Owner adds the connector once for the organization; each member then connects their own Jungler account.

### Claude Code

```bash
claude mcp add --transport http jungler https://mcp.jungler.ai/
```

Then run `/mcp` in Claude Code and choose **Authenticate** for *jungler*.

### ChatGPT

1. In ChatGPT, open **Plugins > Add custom MCP server**.
2. Name it *Jungler*, set authentication to **OAuth** and paste `https://mcp.jungler.ai/` as the URL.
3. Create it and sign in to Jungler.

### Codex

```bash
codex mcp add jungler --url https://mcp.jungler.ai/
codex mcp login jungler
```

### Cursor, VS Code and other clients

Open Jungler's [**Settings > MCP & API**](https://app.jungler.ai/settings/mcp-api) for one-click installs. Any other client that supports remote MCP servers over Streamable HTTP with OAuth works with the server URL above.

## What the assistant can do

Read-only tools run without asking. Tools that change your workspace are marked as such, so your assistant can ask you before running them; tools that delete something are marked destructive.

### Discovery

| Tool | What it does | Changes data |
| --- | --- | --- |
| Search creators | Finds LinkedIn creators by who they are, how they perform, and who engages with their posts | No |
| Find a creator | Looks up one creator by profile URL or name | No |
| Open a creator profile | Opens a creator's full audience breakdown (uses a profile open from your plan) | Yes |
| Share a creator profile | Creates a public link to a creator's profile page | Yes |
| List creator lists | Lists your saved-creator lists | No |
| Save creators | Saves creators, optionally into a list | Yes |
| Remove creators from a list | Takes creators out of one list; they stay saved | Yes |
| Unsave creators | Removes creators from saved entirely | Yes, destructive |
| Discovery usage | Shows your profile opens used and left | No |

### Signals

| Tool | What it does | Changes data |
| --- | --- | --- |
| Signals | Lists what your workspace tracks: profiles, companies, keywords and posts | No |
| Who engaged | People who reacted to or commented on posts you've collected, filterable by country, job level, function and more | No |
| Posts | Posts collected for a keyword, person or company page | No |
| Collect (uses credits) | Collects new engagers or posts for a post URL, profile, company page or keyword | Yes |
| Wait for a collection | Checks whether a collection has finished | No |
| Stop monitoring | Stops a signal's daily collection; collected data stays | Yes |
| Delete a signal | Deletes a signal or post engagement with everything it collected | Yes, destructive |
| Credits and prices | Your credits left and what each kind of collection costs | No |

### Integrations and account

| Tool | What it does | Changes data |
| --- | --- | --- |
| List integrations | Lists where your Signals data is sent (Clay, Sheets, Slack, webhooks, outreach tools) | No |
| Set up an integration | Sends chosen signals' new posts or engagers to a connected destination | Yes |
| Remove an integration | Stops sending data to a destination | Yes, destructive |
| Jungler app links | Links to the app pages for profile, workspace, team and billing settings | No |

Accounts for integrations are connected in the [Jungler app](https://app.jungler.ai/settings/integrations), never in the chat.

## Credits

Only **Collect** spends credits. Small collections start right away; larger ones come back with a quote, and the assistant asks you before going ahead. Reading what you've already collected is free. Searching creators and opening profiles count against your plan's Discovery allowance instead of credits.

## Disconnect

Open Jungler's [**Settings > MCP & API**](https://app.jungler.ai/settings/mcp-api) to see every connected assistant and revoke any of them. Revoking ends that assistant's access immediately. You can also remove the connector in the assistant itself.

## Data and privacy

- The assistant sees only the workspace you picked when connecting, and only what its tools return.
- Jungler receives the tool calls the assistant makes (for example, a search's filters or a post URL). It doesn't receive your conversation.
- LinkedIn data comes from public posts and engagement, as described in Jungler's [Privacy Policy](https://jungler.ai/privacy).

## Troubleshooting

- **"Plan upgrade required"**: the tool isn't in your current plan. See [What you need](#what-you-need).
- **The assistant shows another workspace's data**: disconnect and connect again, then pick the right workspace on the consent page.
- **Sign-in loops or fails**: remove the connector, add it again, and make sure pop-ups are allowed for claude.ai or chatgpt.com.

Questions? Email [team@jungler.ai](mailto:team@jungler.ai).
