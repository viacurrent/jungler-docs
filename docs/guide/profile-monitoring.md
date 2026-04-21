---
sidebar_position: 2
sidebar_label: Profile engagement
---

import Link from '@docusaurus/Link';

# Profile engagement monitoring

Capture your ICPs (ideal customer profiles) engaging with your content, competitors, or industry influencers.

## Setup

Paste a LinkedIn profile URL – that's the whole setup. On the first run, Jungler pulls in all posts from the past month and extracts every engager. After that, the signal updates every 24 hours automatically.

<video autoPlay loop muted playsInline width="100%" style={{border: '1px solid var(--card-border)', borderRadius: '0.5rem', marginTop: '1rem', marginBottom: '1.5rem'}}>
  <source src="/video/jungler-demo.mp4" type="video/mp4" />
</video>


| URL example | Type |
|---|---|
| `https://www.linkedin.com/in/junglerhendrik/` | **User profile** |
| `https://www.linkedin.com/company/junglerai` | **Company profile** |




## Filtering

Every engager comes enriched, so you can easily filter by your ICP.

:::note Image placeholder
Screenshot of the engager list with the filter panel open.
:::

| Field | Description | Example |
|---|---|---|
| Region | Broad geographic region | EMEA, AMER, APAC |
| Country | Country-level location | United States, Germany |
| Job function | The engager's function | Marketing, Sales, Engineering |
| Seniority | Seniority tier | Executive, Senior, Mid, Junior |
| Job title | Exact title string | Head of Growth |
| Company name | Current employer | Acme Corp |
| Company size | Employee-count bucket | 51–200, 1001–5000 |
| Company industry | Industry classification | SaaS, Fintech |
| Company HQ | HQ country | United States |
| Company website | Primary domain | acme.com |



## Playbooks

| Playbook | What it does |
|---|---|
| **Monitor own profile** | Replay your own funnel. Anyone engaging with your personal posts is self-identifying as paying attention to you directly — usually the warmest top-of-funnel you'll get from social. |
| **Monitor company profile** | Catch the broader, earlier-stage crowd that brand and marketing content attracts. Different signal from your personal profile — more volume, less intent, good for enrichment into nurture. |
| **Monitor competitor** | Engagers on a competitor's posts are category-aware and already forming opinions. Publicly engaging with a competitor is itself a qualifier — they're evaluating, not just browsing. |
| **Industry leaders** | Borrow an audience when yours is too small. Pick voices whose followers match your ICP, not whoever has the biggest follower count — a niche voice with the right audience beats a generic one with a bigger one. |



## Integrations

Route qualified engagers to the tools you already use.

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
