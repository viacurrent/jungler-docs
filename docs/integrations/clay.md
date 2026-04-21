---
sidebar_position: 2
title: Clay
sidebar_label: Clay
---

# <span className="heading-with-icon"><img src="/img/integrations/clay-icon.png" alt="" /> Clay</span>

Push ICP engagers or posts from Jungler to Clay tables automatically.

## Creating a webhook in Clay

Open the Clay table you want to send data to.

1. Click **Actions** > **Sources** > **Webhook**.
2. Select **Monitor Webhook**.
3. Click **Copy** to copy the webhook URL.

![Copy webhook URL in Clay](/img/integrations/clay/clay-webhook.png)

## Testing the connection (optional)

Open Jungler. Go to [**Settings > Integrations > Clay**](https://app.jungler.ai/settings/integrations/clay).

1. Paste the Clay webhook URL you just copied and click **Test**.
2. Wait for the **Connection successful** confirmation.

![Testing the Clay connection](/img/integrations/clay/clay-test.png)

## Adding a configuration

Each configuration routes a set of signals to one Clay webhook.

1. Under **Configurations**, click **Add new configuration** and choose **Send posts** or **Send engagers**.

![Add new configuration dropdown](/img/integrations/clay/clay-add-new-conf.png)

2. Name the configuration (e.g., *Jungler lead-magnets*).
3. Paste your **Clay Webhook URL**.
4. Under **Select signals to sync**, tick the signals to include.
5. Use **Filters** to narrow which contacts are sent. Leave empty to send all.

![Clay configuration form](/img/integrations/clay/clay-config-screen.png)

6. If your ready, click **Create configuration** and pick a historic sync range — last 24 hours, 7 days, 31 days, or no historic data.

![Historic sync options](/img/integrations/clay/clay-historic-sync.png)

Repeat to route different signals to different Clay tables.
