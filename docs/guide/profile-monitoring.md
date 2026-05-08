---
sidebar_position: 2
sidebar_label: Profile engagement
description: Capture ICPs engaging with your content and competitors on LinkedIn. Profile monitoring turns every engagement into an enriched, outreach-ready lead.
keywords:
    - linkedin profile monitoring
    - icp tracking
    - engagement tracking
    - lead generation
    - linkedin engagers
---

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Profile engagement

Capture your ICPs (ideal customer profiles) engaging with your content, competitors, and industry influencers.

## Setup

Go to Jungler, click "New", choose "Profile monitoring" and paste a LinkedIn profile URL — that's the whole setup.

On the first run, Jungler pulls in all posts from the time range you set under "Historic posts" and extracts everyone who engaged with them. After that, the signal updates every 24 hours automatically.

<video autoPlay loop muted playsInline width="100%" style={{border: '1px solid var(--card-border)', borderRadius: '0.5rem', marginTop: '1rem', display: 'block'}}>
  <source src="/img/profile-monitoring/jungler-demo.mp4" type="video/mp4" />
</video>

## Explore results

Every engager comes enriched, so you can easily find your ICPs. Explore the profile's posts, engagement, and analytics.

<Tabs>
  <TabItem value="posts" label="Posts" default>
    <img src="/img/profile-monitoring/jungler-posts.png" alt="Profile posts view" style={{border: '1px solid var(--card-border)', borderRadius: '0 0 8px 8px'}} />
  </TabItem>
  <TabItem value="engagement" label="Engagement">
    <img src="/img/profile-monitoring/jungler-engagers.png" alt="Profile engagement view" style={{border: '1px solid var(--card-border)', borderRadius: '0 0 8px 8px'}} />
  </TabItem>
  <TabItem value="analytics" label="Analytics">
    <img src="/img/profile-monitoring/jungler-analytics.png" alt="Profile analytics view" style={{border: '1px solid var(--card-border)', borderRadius: '0 0 8px 8px'}} />
  </TabItem>
</Tabs>


## Playbooks

The most common profile engagement playbooks.

| Playbook | Description |
|---|---|
| **Your own profile** | The easiest win. Anyone engaging with your posts already knows you. They've read your take, liked it, maybe commented. That's not a cold lead — that's someone who opted in. Outbound response rates here blow past anything you'll get from a raw ICP list. |
| **Company profile** | People engaging with your company updates are raising their hand. They're curious, evaluating, or already sold and looking for a reason to reach out. Don't make them wait. |
| **Competitor profiles** | If someone's engaging with your competitor's posts, they're in-market. They're comparing, forming opinions, maybe frustrated with what they have. These leads already understand the category — you just need to give them a better option. |
| **Industry leaders** | Borrow someone else's audience. Find voices whose followers look like your ICP — not the biggest accounts, the most *relevant* ones. A niche creator with 5K of the right followers beats a thought leader with 200K randoms. Think of it as social media targeting for outbound. |


## Next steps

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
