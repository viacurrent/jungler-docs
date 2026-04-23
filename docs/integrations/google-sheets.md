---
sidebar_position: 4
title: Google Sheets
sidebar_label: Google Sheets
description: Export Jungler engagers and posts to Google Sheets automatically. One-time service account setup, then every signal writes to your sheet in real time.
---

# <span className="heading-with-icon"><img src="/img/integrations/sheets-icon.png" alt="" /> Google Sheets</span>

Push ICP engagers or posts from Jungler to Google Sheets automatically.

## Sharing your Google Sheet

Open Jungler. Go to [**Settings > Integrations > Google Sheets**](https://app.jungler.ai/settings/integrations/google-sheets).

1. Copy the service account email under **Setup**.

![Copy Jungler's service account email](/img/integrations/google-sheets/google-service-account.png)

2. Open your Google Sheet and click **Share** in the top right.
3. Paste the service account email and grant it **Editor** access.

## Testing the connection (optional)

Back on the Jungler Google Sheets page:

1. Paste your Google Sheets URL under **Test connection** and click **Test**.
2. Wait for the **Connection successful** confirmation.

## Adding a configuration

Each configuration routes a set of signals to one Google Sheet tab.

1. Under **Configurations**, click **Add new configuration** and choose **Send posts** or **Send engagers**.

![Add new configuration dropdown](/img/integrations/google-sheets/google-creating-conf.png)

2. Name the configuration (e.g., *Hot leads*).
3. Paste the **Google Sheets URL** and enter the **Sheet tab name** (e.g., *Sheet1*).

![Google Sheets configuration form](/img/integrations/google-sheets/google-url-and-tab.png)

4. Under **Select signals to sync**, tick the signals to include.
5. Use **Filters** to narrow which contacts or posts are sent. Leave empty to send all.
6. Click **Create configuration** and pick a historic sync range — last 24 hours, 7 days, 31 days, or no historic data.

![Historic sync options](/img/integrations/google-sheets/google-historic-sync.png)

Repeat to route different signals to different sheets or tabs.
