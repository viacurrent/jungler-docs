---
sidebar_position: 1
---

# How Jungler Works

Jungler does one thing: surfaces the right social conversations for your team. It does it three ways, and which one you reach for depends on what you already know.

## Three ways Jungler watches social

**[Profile engagement monitoring](./profile-monitoring.md).** You already know the accounts you care about — your buyers, your competitors, a handful of industry voices. Jungler tracks who's commenting and reacting on their posts, so every engager becomes a lead you can qualify. Reach for this when the *accounts* are the signal.

**[Keyword monitoring](./keyword-monitoring.md).** You don't know the accounts, but you know the behavior or topic. Write a search — `"recommendations" AND "CRM"`, for example — and Jungler keeps watching for matching posts. An AI layer grades each result against your own relevance prompt. Reach for this when the *behavior* is the signal.

**[Post engagement (Workbooks)](./post-engagement.md).** A single post has already blown up — a product launch, an industry thread, a complaint — and you want everyone who touched it. Paste the URL, Jungler pulls every commenter and reactor, deduplicated. Reach for this when a *specific post* is the signal.

## What you get back

The output looks the same across all three: enriched engager records. Name, headline, job function, seniority, company, company size, country, industry. For comments you also get the comment text; for reactions you get the type (like, praise, insight, etc.). The full field list lives in the [Engagers API](../api/engagers.md) reference.

Under the hood, profile monitoring and keyword monitoring are both "signals" (saved, scheduled searches). Workbooks are one-off extractions. The data model is unified — once engagers are in, it doesn't matter which tool produced them.

## Where it goes

Everything lands in your Jungler dashboard first. From there you can send it wherever your team already works: directly into [Clay](../integrations/clay.md) for enrichment, [Slack](../integrations/slack.md) for real-time alerts, [Google Sheets](../integrations/google-sheets.md) for reporting, [HeyReach](../integrations/heyreach.md) or [Expandi](../integrations/expandi.md) for outreach, or straight to the [API](../api/index.md) if you're building something custom.
