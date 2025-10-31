---
sidebar_position: 4
---

# Search Syntax

Understanding how search operators work helps you build precise queries that surface the right conversations.

:::info
Social media search doesn't work like Google. Mastering quotation marks and Boolean operators turns an overwhelming feed into a targeted stream of opportunities.
:::

---

## Quotation Marks

Control how strictly your keywords are matched:

| Search Query | Behavior |
|--------------|----------|
| `"recommendations"` | **Exact match** for that specific word. With high-volume results, may include variations like "recommend" and "recommended". |
| `recommendations` | **Broader match** that includes related terms and variations. |

**When to use quotes:**
- ✅ Use quotes when you're getting too many irrelevant results
- ✅ Remove quotes when you're not finding enough posts

---

## Boolean Operators

### AND Operator

Returns posts that include **all** keywords.

```
CRM AND "sales automation"
```
*Only shows posts mentioning both "CRM" and "sales automation"*

### OR Operator

Returns posts that match **at least one** keyword.

```
hubspot OR salesforce OR "Microsoft Dynamics"
```
*Shows posts mentioning any of these CRM platforms*

### NOT Operator

Excludes posts containing specific keywords.

```
"data analyst" NOT intern
```
*Shows data analyst posts but filters out internship listings*

---

## Search Limits

:::warning Platform Constraints
- Maximum **6 keywords** per search
- Maximum **5 operators** per search
:::

---

## Tuning Your Results

### Too Many Irrelevant Posts?

<details>
<summary><strong>Add more specific keywords</strong></summary>

```
Before: recommendations
After:  "recommendations" AND B2B AND software
```
</details>

<details>
<summary><strong>Use exact matches with quotes</strong></summary>

```
Before: benchmarking
After:  "benchmarking"
```
</details>

<details>
<summary><strong>Exclude noise with NOT</strong></summary>

```
"hiring" NOT intern NOT internship
```
</details>

<details>
<summary><strong>Refine your AI prompt</strong></summary>

Make your filter more restrictive to catch fewer false positives.
</details>

---

### Too Few Relevant Results?

<details>
<summary><strong>Use broader matches without quotes</strong></summary>

```
Before: "recommendations"
After:  recommendations
```
</details>

<details>
<summary><strong>Use OR to expand options</strong></summary>

```
Before: "CRM recommendations"
After:  "recommendations" AND (CRM OR "sales tools" OR "customer management")
```
</details>

<details>
<summary><strong>Simplify your AI prompt</strong></summary>

Make your filter less restrictive to see more potential matches.
</details>

---

## Example Searches

| Goal | Query |
|------|-------|
| Finding Buying Intent | `"looking for" AND "email marketing" NOT "job"` |
| Tracking Competitor Mentions | `(hubspot OR marketo) AND (price OR pricing OR expensive)` |
| Monitoring Pain Points | `"frustrated with" AND spreadsheet AND (reporting OR analytics)` |
| Identifying New Decision Makers | `"new role" AND (VP OR director OR head) AND marketing` |

---

## Next Steps

**→** See [search ideas](/docs/search-ideas) for proven query patterns

**→** Configure [AI filtering](/docs/ai-filtering) to further refine results

**→** Use the [Searches API](/docs/api/searches) to manage searches programmatically
