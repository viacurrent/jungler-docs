---
sidebar_position: 7
title: Webhooks
sidebar_label: Webhooks
description: Deliver Jungler data to n8n, Zapier, Make, or any custom endpoint via webhooks — real-time delivery of enriched engagers and posts as they arrive.
keywords:
    - jungler webhooks
    - webhook integration
    - n8n integration
    - zapier integration
    - make integration
---

# <span className="heading-with-icon"><img src="/img/integrations/webhook-icon.png" alt="" /> Webhooks</span>

Webhooks automatically deliver data from Jungler to external endpoints like n8n, Zapier, Make, or custom URLs whenever new data is collected.

## How does webhook delivery work?

Jungler sends data from your signals to external endpoints on a scheduled basis. Here's what you need to know:

### Data Types

Webhooks can send two types of data:

- **Posts** - Social media posts matching your search criteria
- **Engagements** - User interactions (likes, comments) on posts from monitored profiles or companies

:::info About Engagements
Engagements are currently only available for **company or profile monitoring**, not for keyword searches or signals.

Engagement types can be either **REACTION** (likes, other reactions) or **COMMENT** (comments, replies). The `content` field only contains data for COMMENT engagement types - for REACTION types, it will be "N/A".

**Note on `engaged_at` timestamps:** For COMMENT engagements, this is the actual date/time of the comment. For REACTION engagements, this is when the reaction was detected and entered the Jungler system. All timestamps are in UTC.
:::

### Delivery Schedule

- Webhooks deliver data **once every 24 hours** with aggregated data from all signals included in the configuration
- First delivery happens in approximately 24 hours after webhook creation
- Without historic sync enabled, only new data collected after webhook creation will be included in the first delivery

### Batch Delivery

Jungler sends data in **batches of up to 500 records per request** to optimize delivery:

- Some platforms like **Zapier** automatically unpack batches, creating individual "zaps" for each record
- Other platforms like **n8n** require you to add an unpacking step in your workflow to process each record individually
- Batches are sent every 2 seconds with a maximum of **10,000 records per sync** (applies to both posts and engagements)

:::tip Processing Batches
If you're using a platform that doesn't automatically unpack batches, add a "split" or "loop" node at the start of your workflow to process each record individually.
:::

### Data Volume Considerations

- If you have many high-volume signals in one configuration, some data might be lost due to the 10,000 record limit
- For best results, avoid combining too many high-volume signals in a single webhook configuration

## Setting Up a Webhook

Configure webhooks through the Jungler UI:

### Required Fields

1. **Name** - A descriptive name for your webhook
2. **URL** - The endpoint where data should be sent
3. **Data Type** - Choose between Posts or Engagements

### Optional Configuration

#### Custom Headers

Add up to 3 custom headers to your webhook requests (e.g., for authentication):

```
Authorization: Bearer your-token-here
X-Custom-Header: your-value
```

**Why use custom headers?** Many platforms and APIs require authentication tokens or custom headers for security. This allows you to securely connect Jungler to protected endpoints.

#### Historic Sync

When creating a webhook, choose how much historical data to sync:

- **None** - Only sync new data going forward (starts in ~24 hours)
- **1 day** - Sync data from the last 24 hours
- **7 days** - Sync data from the last week
- **31 days** - Sync data from the last month

:::warning One-time Sync
Historic sync only happens once when the webhook is created. After that, only new data is sent in daily batches.
:::

#### Email Column

**Email** — and its paired **Email status** — is a column you can include in a webhook configuration. When it's selected, an engager or author is delivered once email finding completes (shortly after they're first seen); those whose email can't be found are still delivered, with a blank email. **Email status** distinguishes `found`, `not_found`, and `pending`.

## Webhook Behavior

### Pausing and Resuming

If you pause a webhook and resume it later, the next sync will include all data from when it was paused:

**Example:** Pause on January 1st, resume on January 10th → next sync includes all data from January 1st onwards, not just from the resume date.

### Error Handling

If your webhook endpoint returns a client error (4xx status codes like 403 Forbidden, 401 Unauthorized):

- The webhook will be **automatically stopped**
- You must manually update the webhook configuration to resume delivery
- Check your endpoint URL and authentication headers before resuming

### Data Security

All sensitive data (like custom header values) is stored in encrypted form.

## Webhook Payload Structure

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note Email fields
`author_email` / `author_email_status` (posts) and `email` / `email_status` (engagements) are included only when the **Email** column is selected in the webhook configuration. `email_status` is one of `found`, `not_found`, or `pending` — an empty email with `pending` is still resolving, while `not_found` means none could be found.
:::

<Tabs>
<TabItem value="posts" label="Posts Payload" default>

```json
[
  {
    "headers": {
      "content-type": "application/json",
      "x-auth-token": "your-token"
    },
    "body": [
      {
        "author_name": "John Doe",
        "author_first_name": "John",
        "author_last_name": "Doe",
        "author_email": "john.doe@techcorp.com",
        "author_email_status": "found",
        "author_country": "United States",
        "author_country_code": "US",
        "author_headline": "CEO @ TechCorp",
        "author_profile_url": "https://www.linkedin.com/in/johndoe",
        "author_type": "user",
        "author_company_job_title": "CEO",
        "author_company_name": "TechCorp",
        "author_company_website": "https://techcorp.com",
        "author_company_hq_country": "United States",
        "author_company_hq_country_code": "US",
        "author_company_staff_range": "11-50",
        "author_company_staff_registered": "45",
        "author_company_industry": "TECH_INFO_MEDIA",
        "author_function": "GEN",
        "author_seniority": "L",
        "post_url": "https://example.com/posts/...",
        "post_content": "Just shipped our new feature...",
        "post_language": "en",
        "post_sentiment": "positive",
        "post_type": "announcement",
        "posted_at": "2026-01-10T15:30:00.000000+00:00",
        "jungler_signal_id": "69654ea72a0d2c9f612d1cb4",
        "jungler_post_id": "69654ea72a0d2c9f612d1cb5"
      }
      // ... up to 500 posts per batch
    ]
  }
]
```

</TabItem>
<TabItem value="engagements" label="Engagements Payload">

```json
[
  {
    "headers": {
      "content-type": "application/json",
      "x-auth-token": "your-token"
    },
    "body": [
      {
        "jungler_signal_id": "6963b2beb79d3a2768c537ba",
        "jungler_post_id": "6963b2beb79d3a2768c537bb",
        "name": "Jane Smith",
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane.smith@startupco.com",
        "email_status": "found",
        "headline": "VP of Engineering @ StartupCo",
        "profile_url": "https://example.com/profile/...",
        "profile_type": "user",
        "profile_urn": "ACoAAApaN_cBDNTq...",
        "title": "VP of Engineering",
        "company": "StartupCo",
        "country": "United Kingdom",
        "country_code": "GB",
        "region": "EU",
        "function": "Engineering",
        "seniority": "Executive",
        "company_staff_range": "51-200",
        "company_staff_registered": "156",
        "company_website": "https://startupco.com",
        "company_industry": "TECH_INFO_MEDIA",
        "company_hq_country": "United Kingdom",
        "company_hq_country_code": "GB",
        "engagement_type": "REACTION",
        "content": "N/A",
        "reaction_type": "LIKE",
        "post_url": "https://example.com/posts/...",
        "engaged_at": "2026-01-11T14:25:02.305000+00:00"
      }
      // ... up to 500 engagements per batch
    ]
  }
]
```

</TabItem>
</Tabs>

## Platform-Specific Recommendations

### Zapier & Make

Use **custom webhooks** via "Webhooks by Zapier" or Make's "Webhooks" module. These platforms handle batch unpacking automatically.

### n8n

Use **custom webhooks** via n8n's Webhook node. Add a "Split Out" or "Loop Over Items" node after the webhook to process each record individually since n8n doesn't automatically unpack batches.

### Clay & Slack

We recommend using the **official Jungler integrations** for Clay and Slack when available. These integrations send data one record per request, which most users prefer. 

You can still use custom webhooks if bulk delivery works better for your use case, but note that Clay has strict limits on data quantity.

## Troubleshooting

### Webhook Not Receiving Data

- Check that your webhook URL is publicly accessible
- Verify custom headers are correct (especially authentication tokens)
- Ensure your endpoint accepts POST requests with JSON payloads
- Check if the webhook was automatically stopped due to errors

### Data Volume Issues

If you're experiencing failures due to large data loads:

- Consider splitting high-volume signals across multiple webhook configurations
- Contact support if you need assistance optimizing your setup
- Our 500-record batch limit is designed to work reliably with most webhook platforms

### Missing Historical Data

Remember that historic sync only happens once when creating the webhook. If you need to re-sync historical data, you'll need to create a new webhook with historic sync enabled.
