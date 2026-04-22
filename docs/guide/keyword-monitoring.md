---
sidebar_position: 3
sidebar_label: Keyword monitoring
---

import Link from '@docusaurus/Link';

# Keyword monitoring

Track mentions of your brand, competitors, and industry terms across LinkedIn. Every matching post gets captured, and its author enriched.

## Setup

Go to [Jungler](https://app.jungler.ai/searches/new) and create a keyword monitoring. Start with your brand or competitor name.

The first run pulls about a month of historical posts — capped at ~250 post due to platform limits. After that, the signal runs every 24 hours and pulls up to ~250 new posts per 24h.

## Use cases

### Monitor your brand

Anyone posting about you — good or bad — is worth knowing about.

```
"brand" OR "brand.ai"
```

### Monitor competitor brands

Same idea, someone else's name. People mentioning your competitors are category-aware and often in-market.

```
"competitor_brand" OR "competitor_brand.ai"
```

### Monitor industry keywords (advanced)

Broader searches for category terms and pain-point language. These cast a wider net and take more tuning, but they're often the highest-leverage signals.

```
("looking for" OR "recommendations") AND CRM
```

Start with your brand and competitor names. Add industry keywords once you're comfortable with how LinkedIn search works.


## Keyword query

Jungler uses LinkedIn's [boolean search operators](https://www.linkedin.com/help/linkedin/answer/a524335).

| Rule | Example |
|---|---|
| Quote multi-word phrases for exact match | `"linkedin data"` |
| Use `AND`, `OR`, `NOT` in uppercase | `CRM AND sales NOT job` |
| Group with parentheses | `("looking for" OR "recommendations") AND CRM` |

Searches are limited to 6 keywords and 5 operators.

### What doesn't work

**High-volume keywords.** Very common terms (`"recommendations"`, `"email marketing"`) match more posts than the ~250/day cap can pull in, so you'll only see a thin slice of what's out there. Narrow with `AND` and more specific terms.

**Dead phrases.** A few phrases return nothing regardless of how you write them — `"open to work"` is the well-known one.

## AI filtering

Add a custom AI prompt to filter out noise. For example, if your brand name is "Clay", you'll want to filter out posts about pottery clubs.

The AI sees: **Post content**, **Author headline**, **Author profile**

**Example prompt:**

```
Mark a post as relevant if ALL of the following are true:
- The post discusses a go-to-market SaaS tool called Clay (clay.com)
- The author works at a B2B company in a revenue-facing role
  (sales, marketing, RevOps, or founder)
- The post expresses an opinion, question, or experience — not a
  job listing or promotional content

Exclude posts about:
- Pottery, ceramics, or art supplies
```

Keep prompts specific and concrete. Abstract prompts produce abstract results.

## Next steps

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
