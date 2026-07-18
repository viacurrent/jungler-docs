# Docs backlog — durable follow-ups

Persistent list of known documentation gaps that are NOT tied to a single feature
branch (so they survive task/handoff churn). Delete an item only when it's actually
done. Kept at repo root so Docusaurus does not render it.

## Public API

- [ ] **Document `GET /api/engagers/post/{post_id}` fully.** It is a live public
  endpoint (`jg-back/src/api/public/engagers.py`, the per-post engagers list) that is
  currently absent from `docs/api/engagers.md` entirely. Cover: path/query params,
  pagination (`snapshot_time`), the `captured_after`/`captured_before` incremental-sync
  cursor, the response shape, AND the `email_status` filter (added 2026-07 with the
  public-email feature — this is what makes documenting it important now). Model it on
  the existing Signal Engagers section.

## Integrations (shipped, undocumented)

- [ ] **Webhook payload tables** (`docs/integrations/webhooks.md`, Posts + Engagements
  payloads) lack the email fields that ship when the Email column is selected:
  `email` / `email_status` (engagers) and `author_email` / `author_email_status`
  (posts).
- [ ] **Clay / Google Sheets / Webhooks / Expandi / HeyReach** integration pages don't
  mention the selectable **Email** column/field, the paired **Email status**, or the
  sync-timing behavior (rows wait for email resolution when Email is selected;
  unfound emails still sync with a blank email).
