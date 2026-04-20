---
sidebar_position: 4
sidebar_label: Post engagement
---

# Post engagement

A workbook is a collection of LinkedIn posts. Paste posts in and Jungler extracts every commenter and reactor from each — enriched, deduplicated across the whole workbook.

Typical use: drop your last ten lead-magnet posts into one workbook and walk away with a single deduped list of everyone who engaged with any of them.

## Setup

Paste a LinkedIn post URL. Pick reactions, comments, or both. Add more posts to the same workbook to aggregate engagers across them.

:::note Image placeholder
Screenshot of the "Extract post engagement" modal.
:::

Each post takes a few minutes to extract. Unlike signals, a workbook is a one-off pull — not a scheduled watch.



## Filtering

Every engager comes enriched. Filter on any of the fields to isolate your ICP.

:::note Image placeholder
Screenshot of the populated workbook with the filter panel open.
:::

Toggle **All** vs **Unique** at the top to switch between raw engagements (every like and comment, including repeats) and deduplicated contacts (one row per person, counts rolled up).

<details>
<summary>All filter fields</summary>

| Filter | Description |
|---|---|
| Author | The post's author — useful when a workbook has posts from multiple profiles |
| Engagement | Engagement type (reaction or comment) |
| Region | Engager's region or country |
| Function | Job function (Sales, Marketing, Engineering, etc.) |
| Seniority | Executive, Manager, Individual Contributor, Junior |
| Company size | Employee-count bucket |
| Company industry | Industry classification |
| Company HQ | Company headquarters country |

</details>

Full field reference in the [Engagers API](../api/engagers.md).



## Playbooks

**Competitor launch.** Workbook their announcement post — every reactor already cares about the category.

**Viral industry thread.** A thought leader asks a question and 500 people answer. Every reply is someone with an opinion strong enough to write it down.

**Webinar or event post.** Reactors to "I'm speaking at X" are usually attending. Grab them the day of, then again a week later.



## Export

Workbooks are export-only — there's no scheduled route to an integration. Download a CSV (or pull via the [Engagers API](../api/engagers.md)) and drop it wherever your list lives.

Workbook data expires 12 hours after extraction. Pull what you need before then.

:::tip Scheduled vs one-off
If you keep workbooking the same profile's posts every week, switch to [profile monitoring](./profile-monitoring.md) instead. Workbooks are for curated post lists — the ones you couldn't have predicted would be worth grabbing.
:::
