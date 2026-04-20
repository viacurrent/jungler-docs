---
sidebar_position: 2
title: Clay
sidebar_label: Clay
---

# <span className="heading-with-icon"><img src="/img/integrations/clay-icon.png" alt="" /> Clay</span>

Integrating Clay with Jungler enables you to push filtered contacts that match your ICP criteria to a Clay table automatically.

## Adding webhook as a source in your Clay table

If your Clay table does not already monitor a Webhook for incoming data, you'll need to add Webhook as a source of data for your table. Follow these steps:

1. Click **Actions**, then **Sources**, then **Webhook**.
2. Select **Monitor Webhook** in the list of available options.
3. Click Copy to **copy** the Webhook URL to your clipboard to paste in the Jungler dashboard.

![Adding webhook source in Clay](/img/integrations/clay/playbook-clay-1.png)

## Testing

Go to Jungler and click on your profile icon on the top right corner, and then navigate from **Settings** to **Integrations** ([https://app.jungler.ai/settings/integrations/clay](https://app.jungler.ai/settings/integrations/clay)).

To test your integration, follow these steps:

1. Enter the URL of your Clay Webhook and click the "Test" button to run it.
2. After testing the URL, you will send a test payload to the provided URL, simulating the data that would be sent during actual use.
3. Observe the bottom of the "Test connection" box for feedback. These notifications will inform you whether the test event was successful.

![Testing the Clay integration](/img/integrations/clay/playbook-clay-2.png)

## Add new webhook

Here's how you can start pushing data to a Clay table:

1. Below **Configured webhooks** at the bottom of the screen, click **+ Add new webhook** and choose whether you want to send posts or to send engagers (commenters and reactors). The Clay configuration pop-up box now opens up.
2. Insert the URL of your Clay webhook to **Clay Webhook URL**.
3. Choose how much historical data to sync on the first run with the **Historic sync** option.
4. **Select signals to sync** to choose the signal from which you'd want to send data to Clay.
5. Apply any **Filters** to only send contacts that match your criteria. Leave empty to send all engagers.
6. Click the **Create configuration** button for activation.

![Clay webhook configuration](/img/integrations/clay/playbook-clay-3.png)

![Clay configuration complete](/img/integrations/clay/playbook-clay-5.png)

Congratulations – you've now set up your Jungler → Clay integration.
