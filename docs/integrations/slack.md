---
sidebar_position: 3
title: Slack
sidebar_label: Slack
description: Send filtered Jungler posts and engagers to any Slack channel automatically. Get your team alerts the moment a qualified engagement lands.
---

# <span className="heading-with-icon"><img src="/img/integrations/slack-icon.png" alt="" /> Slack</span>

Automatically send filtered posts or engagers to Slack channels.

## Connecting Slack

Open Jungler. Go to [**Settings > Integrations > Slack**](https://app.jungler.ai/settings/integrations/slack).

1. Click **Connect**
2. You'll be redirected to Slack. Pick the **workspace** you want to connect and click **Allow**.

![Slack authorization screen](/img/integrations/slack/slack-redirect.png)

3. Slack will send you back to Jungler.

## Adding a configuration

Each configuration routes a set of signals to one Slack channel.

1. Under **Configurations**, click **Add new configuration** and choose **Send posts** or **Send engagers**.

![Add Slack configuration pop-up](/img/integrations/slack/slack-add-new-conf.png)

2. Name the configuration (e.g., *Product updates*).
3. Pick the **Slack channel** to send to. (If your Slack workspace has many channels, the channel list can take up to a minute to load. This is due to Slack's rate limits.)
4. Under **Select signals to sync**, tick the signals to include.
5. Use **Filters** to narrow which engagers or posts get sent. Leave empty to send all.
6. Click **Create configuration**.

If the configuration was successful, you'll get a confirmation message in your Slack channel immediately.

![Slack confirmation message](/img/integrations/slack/slack-success.png)

Repeat to route different signals into different channels.