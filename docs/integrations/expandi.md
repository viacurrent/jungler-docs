---
sidebar_position: 6
title: Expandi
sidebar_label: Expandi
---

# <span className="heading-with-icon"><img src="/img/integrations/expandi-icon.svg" alt="" /> Expandi</span>

Push engagers or post authors from Jungler into your Expandi outreach campaigns automatically.

## Connecting Expandi

In Expandi, go to **Integrations** and click **View keys** on the *Expandi API credentials* card to get your **API key** and **API secret**.

![Expandi API credentials](/img/integrations/expandi/expandi-api-keys.png)

Then open Jungler. Go to [**Settings > Integrations > Expandi**](https://app.jungler.ai/settings/integrations/expandi).

1. Click **Connect**.
2. Paste your **API key** and **API secret**, then click **Connect**.

![Connect Expandi in Jungler](/img/integrations/expandi/expandi-connect-jungler.png)

## Adding a configuration

Each configuration routes a set of signals to one Expandi campaign.

NB! You need at least one campaign in Expandi before creating a configuration in Jungler.

1. Under **Configurations**, click **Add new configuration** and choose **Send posts** or **Send engagers**.

![Add new configuration dropdown](/img/integrations/expandi/expandi-create-conf.png)

2. Name the configuration (e.g., *Hot leads to Expandi*).
3. Pick the target **LinkedIn account** and **Campaign** from the dropdowns.
4. Under **Select signals to sync**, tick the signals to include.
5. Under **Fields to send**, tick which fields to sync to Expandi.
6. Use **Filters** to narrow which leads are sent. Leave empty to send all.
7. Click **Create configuration** and pick a historic sync range — last 24 hours, 7 days, 31 days, or no historic data.

![Historic sync options](/img/integrations/expandi/expandi-historic-sync.png)

Repeat to route different signals to different campaigns.
