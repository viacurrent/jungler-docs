---
sidebar_position: 3
sidebar_label: Keyword monitoring
---

import Link from '@docusaurus/Link';

# Keyword monitoring

Find intent signals from social data — posts where your buyers are asking for help, evaluating competitors, or venting about their current tools.

## Setup

Write a search. That's the whole setup.

:::note Image placeholder
Screenshot of the keyword signal setup in the Jungler dashboard.
:::

| Example query | What it catches |
|---|---|
| `"looking for" AND CRM` | Active buying intent |
| `"switching from [competitor]"` | Displacement opportunities |
| `("struggling with" OR "hate that") AND attribution` | Pain-point language |

The first run pulls about a month of historical posts — capped at ~250 per signal due to platform limits. After that, the signal runs every 24 hours automatically.



## Writing a search

Two things matter: whether you quote, and how you combine terms.

**Quotes.** `CRM` = exact match. `"CRM"` = broader match (includes "CRMs", "CRMed"). `"looking for"` = multi-word phrase kept intact. Rule of thumb: single words unquoted, phrases quoted.

**Operators.** `AND`, `OR`, `NOT` — uppercase. Parentheses group.

```
("looking for" OR "recommendations") AND (CRM OR "sales tool") NOT spam
```

Queries cap at ~300 characters. Need more coverage? Run two signals.



## AI filtering

Every matching post gets scored by AI against a prompt. Leave it empty for Jungler's default buying-intent filter, or write your own.

:::note Keyword-only
AI filtering only applies to keyword signals. Profile and company signals collect every post — you filter downstream.
:::

**Example prompts:**

```
Only mark relevant posts from people asking for B2B sales software
recommendations for teams of 10–50.
```

```
Mark relevant if someone is frustrated with their current marketing
attribution setup. Exclude agency pitches and hiring posts.
```

Specific and concrete. Name the role, the company type, the intent. Abstract prompts produce abstract results.



## Playbooks

**Buying intent.** `"looking for"`, `"recommendations"`, `"anyone tried"`, `"alternatives to"`, `"best [category]"` — combine with your category name via `AND`.

**Pain points.** `"struggling with"`, `"hate that"`, `"wish there was"` — earlier-stage signals, people forming opinions before they shop.

**Competitor mentions.** `"switching from [competitor]"` is pure gold. Plain competitor names are noisy; layer with `OR` and intent triggers.



## Tuning

**Too noisy.** Tighten the query first (add `AND`, quote phrases), then tighten the prompt.

**Too sparse.** Swap `AND` for `OR`. Drop quotes on single words. Still dry? The topic may be niche enough that [profile monitoring](./profile-monitoring.md) on the known-active accounts fits better.

**Results random.** The query and prompt usually disagree. Re-read both.

:::tip Two-stage filtering
The query narrows the pool; the AI filter grades it. A great query with a vague prompt gives volume without quality. A great prompt with a vague query gives quality without volume. Both need to work.
:::



## Integrations

Route qualified post authors to the tools you already use.

<div className="integration-grid">
  <Link to="/integrations/clay" className="integration-card">
    <img src="/img/integrations/clay-icon.png" alt="" />
    <div className="integration-card-body">
      <div className="integration-card-title">Clay</div>
      <div className="integration-card-subtitle">Email enrichment</div>
    </div>
  </Link>
  <Link to="/integrations/slack" className="integration-card">
    <img src="/img/integrations/slack-icon.png" alt="" />
    <div className="integration-card-body">
      <div className="integration-card-title">Slack</div>
      <div className="integration-card-subtitle">Real-time alerts</div>
    </div>
  </Link>
  <Link to="/integrations/google-sheets" className="integration-card">
    <img src="/img/integrations/sheets-icon.png" alt="" />
    <div className="integration-card-body">
      <div className="integration-card-title">Google Sheets</div>
      <div className="integration-card-subtitle">Export lead lists</div>
    </div>
  </Link>
  <Link to="/integrations/heyreach" className="integration-card">
    <img src="/img/integrations/heyreach-icon.svg" alt="" />
    <div className="integration-card-body">
      <div className="integration-card-title">HeyReach</div>
      <div className="integration-card-subtitle">LinkedIn outreach</div>
    </div>
  </Link>
  <Link to="/integrations/expandi" className="integration-card">
    <img src="/img/integrations/expandi-icon.svg" alt="" />
    <div className="integration-card-body">
      <div className="integration-card-title">Expandi</div>
      <div className="integration-card-subtitle">LinkedIn outreach</div>
    </div>
  </Link>
  <Link to="/integrations/webhooks" className="integration-card">
    <img src="/img/integrations/webhook-icon.png" alt="" />
    <div className="integration-card-body">
      <div className="integration-card-title">Webhooks</div>
      <div className="integration-card-subtitle">n8n, Zapier, Make</div>
    </div>
  </Link>
</div>
