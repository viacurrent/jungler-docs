---
sidebar_position: 5
---

# AI Filtering

AI filtering helps you focus on the most relevant posts by automatically classifying each result as "Relevant" or "Not Relevant" based on your custom criteria.

---

## How It Works

Every post matching your search is analyzed by AI according to your custom prompt.

**The AI examines:**

| Data Source | What It Analyzes |
|-------------|------------------|
| **Post content** | Full text and context |
| **Author headline** | Job title and professional description |
| **Author profile** | Company, industry, and authority signals |

---

## Creating Your Filter Prompt

### Default Behavior

Leave the AI filter prompt **empty** to use the default buying-intent filter, which surfaces posts from people actively looking for solutions.

### Custom Prompts

Define specific criteria to match your needs:

```
Only show posts from people looking for marketing automation tools
```

```
Show posts where someone is asking for recommendations or 
expressing frustration with their current tool
```

```
Include posts from marketing leaders at B2B SaaS companies 
with 50+ employees
```

---

## Iterating Your Prompt

**Follow these steps:**

1. **Start Clear** - Be specific about what you want to see
2. **Review Results** - Check both "Relevant" and "Not Relevant" classifications  
3. **Refine** - Too broad? Add detail. Too narrow? Simplify

### Example Iteration

<details>
<summary><strong>Initial prompt (too broad)</strong></summary>

```
Mark post as relevant if it is about CRM tools
```

Result: Too many irrelevant posts about any CRM mention.
</details>

<details>
<summary><strong>After reviewing results</strong></summary>

```
Mark post as relevant if it is from people asking for CRM recommendations or 
comparing CRM options for teams of 10-50 people
```

Result: Better, but still catching some off-topic posts.
</details>

<details>
<summary><strong>Final refined prompt</strong></summary>

```
Mark post as relevant if someone is actively evaluating CRM tools 
for a small business, including questions about features, 
pricing, or asking for recommendations
```

Result: Highly relevant posts from qualified prospects.
</details>

---

## Advanced Options

### Include Company Context

When **enabled**, the AI filter receives information about your company, which can help it better understand relevance in the context of your business.

**Use when:** You want the AI to understand competitive positioning or how posts relate to your specific product.

### Exclude Company Context

When **disabled**, the AI filter operates without knowledge of your company details.

**Use when:** You want more objective filtering that isn't biased by your company information.

---

## Best Practices

### Be Specific About Intent

```
Good: Mark posts relevant from people actively looking for project 
management tools and asking their network for recommendations

Vague: Show relevant posts
```

### Define Your Ideal Customer

```
Good: Mark posts relevant from marketing leaders at B2B companies 
discussing attribution challenges

Vague: Show posts about marketing
```

### Set Clear Exclusions

```
Good: Mark posts relevant about hiring data scientists, but exclude 
internships and academic positions

Unclear: Show posts about data science jobs
```

---

## Combining Filters

Use search syntax and AI filtering together for precision:

:::tip Two-Stage Filtering
1. **Search query** narrows the pool of posts
2. **AI filter** classifies relevance within that pool
:::

**Example:**
- **Search:** `"recommendations" AND "sales tool"`
- **AI Filter:** `Only mark relevant if posts are from people asking for B2B sales software recommendations`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Too many false positives | Make your prompt more restrictive, add specific exclusion criteria, use more precise search keywords |
| Missing relevant posts | Simplify your AI prompt, remove overly restrictive criteria, broaden your search keywords with OR operators |
| Results seem random | Ensure your prompt is clear and specific, break down complex criteria into simpler statements, test with a smaller search first |

---

## Next Steps

**→** Review [how Jungler works](/how-it-works) for the full workflow

**→** Learn about [search syntax](/search-syntax) to optimize your queries

**→** Explore the [Searches API](/api/searches) to manage filters programmatically
