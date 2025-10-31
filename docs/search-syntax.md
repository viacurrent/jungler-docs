---
sidebar_position: 4
---

# Search Syntax

Understanding how search operators work helps you build precise queries that surface the right conversations.

:::info
LinkedIn's post search doesn't behave like Google. Mastering quotation marks and Boolean operators turns an overwhelming feed into a targeted stream of opportunities.
:::

---

## Quotation Marks

LinkedIn's search behavior varies depending on whether you're searching for single or multiple words:

### Single Word Searches

| Search Query | Behavior |
|--------------|----------|
| `recommendations` | **Exact match** for that specific word. Most accurate results. |
| `"recommendations"` | **Broader match** that includes variations like "recommend", "recommended", "recommending". |

**Recommendation:** For single words, **don't use quotes** to get exact matches.

### Multi-Word Phrases

| Search Query | Behavior |
|--------------|----------|
| `looking for recommendations` | **Unpredictable** - behavior varies. May match loosely or return unexpected results. |
| `"looking for recommendations"` | Treats it as a **phrase** - words should appear together or closely connected. May also include variations. |

**Recommendation:** For multi-word phrases, **use quotes** to get predictable, phrase-based matching.

:::tip Best Practices
- Single words: `recommendations` (no quotes)
- Multi-word phrases: `"looking for recommendations"` (with quotes)
- Mix both: `"looking for" AND CRM AND recommendations`
:::

---

## Boolean Operators

### AND Operator

Returns posts that include **all** keywords.

```
CRM AND "sales automation"
```
*Shows posts mentioning both "CRM" and the phrase "sales automation"*

### OR Operator

Returns posts that match **at least one** keyword.

```
hubspot OR salesforce OR pipedrive
```
*Shows posts mentioning any of these CRM platforms*

### NOT Operator

Excludes posts containing specific keywords.

```
"data analyst" NOT intern
```
*Shows "data analyst" posts but filters out internship listings*

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
<summary><strong>Don't use quotes for single words</strong></summary>

```
Before: "recommendations"
After:  recommendations
```

*Single words without quotes give exact keyword matches.*
</details>

<details>
<summary><strong>Use quotes for multi-word phrases</strong></summary>

```
Before: looking for recommendations
After:  "looking for recommendations"
```

*Quotes keep words together as a phrase.*
</details>

<details>
<summary><strong>Add more specific keywords</strong></summary>

```
Before: recommendations
After:  "looking for recommendations" AND B2B AND software
```
</details>

<details>
<summary><strong>Exclude noise with NOT</strong></summary>

```
"hiring" NOT intern NOT internship
```
</details>

<details>
<summary><strong>Be careful with the OR operator</strong></summary>

OR broadens your search significantly. Use it sparingly.
</details>

<details>
<summary><strong>Refine your AI prompt</strong></summary>

Make your filter more restrictive to catch fewer false positives.
</details>

---

### Too Few Relevant Results?

<details>
<summary><strong>Add quotes to single words for variations</strong></summary>

```
Before: benchmarking
After:  "benchmarking"
```

*Quoted single words include variations like "benchmark", "benchmarked".*
</details>

<details>
<summary><strong>Remove quotes from multi-word phrases</strong></summary>

```
Before: "email marketing automation"
After:  email marketing automation
```

*Warning: Unquoted multi-word phrases have unpredictable behavior. Use with caution.*
</details>

<details>
<summary><strong>Use OR to expand options</strong></summary>

```
Before: CRM recommendations
After:  (CRM OR "sales tools") AND recommendations
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
| Finding Buying Intent | `"looking for" AND "email marketing" NOT job` |
| Tracking Competitor Mentions | `(hubspot OR marketo OR salesforce) AND (pricing OR expensive)` |
| Monitoring Pain Points | `"frustrated with" AND spreadsheet AND reporting` |
| Identifying New Decision Makers | `"new role" AND (VP OR director OR head) AND marketing` |

:::tip Quote Strategy
Multi-word phrases like "looking for" and "new role" use quotes to keep words together, while single words like `job`, `marketing`, and `pricing` don't use quotes for exact matches.
:::

---

## Next Steps

**→** See [search ideas](/docs/search-ideas) for proven query patterns

**→** Configure [AI filtering](/docs/ai-filtering) to further refine results

**→** Use the [Searches API](/docs/api/searches) to manage searches programmatically
