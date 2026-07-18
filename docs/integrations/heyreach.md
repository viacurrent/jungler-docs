---
sidebar_position: 5
title: HeyReach
sidebar_label: HeyReach
description: Stream Jungler engagers and post authors directly into HeyReach outreach campaigns — fully automated, filtered, and enriched by default.
---

# <span className="heading-with-icon"><img src="/img/integrations/heyreach-icon.svg" alt="" /> HeyReach</span>

Push engagers or post authors from Jungler into your HeyReach outreach campaigns automatically.

## Connecting HeyReach

In HeyReach, go to [**Settings > Integrations > Public API**](https://app.heyreach.io/app/integrations/public-api/api).

1. Copy your API key. Click **New API key** to generate one if you don't have it yet.

![Copy HeyReach API key](/img/integrations/heyreach/heyreach-api-key.png)

Then open Jungler. Go to [**Settings > Integrations > HeyReach**](https://app.jungler.ai/settings/integrations/heyreach).

2. Click **Connect**.
3. Paste your API key and click **Connect**.

![Connect HeyReach in Jungler](/img/integrations/heyreach/heyreach-connect-jungler.png)

## Adding a configuration

Each configuration routes a set of signals to one HeyReach campaign.

NB! You need at least one campaign in HeyReach before creating a configuration in Jungler.

1. Under **Configurations**, click **Add new configuration** and choose **Send posts** or **Send engagers**.

![Add new configuration dropdown](/img/integrations/heyreach/heyreach-create-conf.png)

2. Name the configuration (e.g., *Hot leads to HeyReach*).
3. Pick the target **Campaign** from the dropdown.
4. Under **Select signals to sync**, tick the signals to include.
5. Under **Fields to send**, tick which fields to sync to HeyReach.
6. Use **Filters** to narrow which leads are sent. Leave empty to send all.
7. Click **Create configuration** and pick a historic sync range — last 24 hours, 7 days, 31 days, or no historic data.

![Historic sync options](/img/integrations/heyreach/heyreach-historic-sync.png)

Repeat to route different signals to different campaigns.

:::note Email field
**Email** — and its paired **Email status** — is one of the **Fields to send**. When it's selected, a lead syncs once email finding completes (shortly after the lead is first seen); leads whose email can't be found still sync, with a blank email. **Email status** distinguishes `found`, `not_found`, and `pending`.
:::
