---
title: "MQL Benchmark"
description: "A 30,000-example open-source benchmark for evaluating natural-language → DSL generation, with a public model leaderboard."
date: "2026-05-15"
tags:
  - "Evaluation"
  - "Benchmarks"
  - "LLMs"
external_url: "https://huggingface.co/datasets/sublime-security/mql-benchmark"
---

**Co-authored with Vivek Sharath.** [HuggingFace dataset](https://huggingface.co/datasets/sublime-security/mql-benchmark) · Apache 2.0.

The **MQL Benchmark** is a 30,630-example evaluation suite for measuring how well language models can translate natural language into [Message Query Language (MQL)](https://docs.sublimesecurity.com/docs/message-query-language) — the domain-specific language used to author email detections at Sublime Security. It's the successor to BabbelPhish: bigger, harder, structured for rigorous comparison, and built with a published leaderboard.

## Structure

| Split | Examples |
|---|---|
| Train | 21,654 |
| Validation | 4,650 |
| Test | 4,326 |

Each example has a natural-language prompt, a gold-standard MQL expression, and rich metadata: a difficulty tier (simple → medium → hard → expert), a prompt-variant style, a source-rule reference, and a validity flag indicating whether the gold MQL passes Sublime's validation API.

**Four difficulty tiers** stress different capability axes:

| Tier | What it tests |
|---|---|
| **simple** | Boolean conditions only, ≤3 clauses |
| **medium** | `any()` / `filter()` / `map()` operations |
| **hard** | Nested lambdas, `$list` references |
| **expert** | Enrichment functions (`ml.*`, `profile.*`, `file.explode`) |

**Four prompt variants** mirror how analysts actually write — full descriptive sentences, atomic single-clause descriptions, inline editor comments, and terse search-query style.

## Evaluation framework

The benchmark ships with four metrics, designed to avoid the failure mode of every LLM-code benchmark: looking accurate while being operationally useless.

1. **validity_rate** — Does the generated MQL pass Sublime's `validate` API? (Binary.)
2. **field_f1** — Precision/recall/F1 over Message Data Model field references.
3. **judge_score** — Claude Opus semantic equivalence on a 0–5 scale.
4. **truly_correct_rate** — Valid *and* judge ≥ 3. The primary metric.

That last metric is the framework's load-bearing design choice: a model that produces syntactically valid but semantically wrong rules is worse than a model that admits it doesn't know. Combining validation with semantic judging captures both.

## Leaderboard (v3 test, k=8 retrieval few-shot)

| Rank | Model | Valid % | Field F1 | Judge | Truly Correct % |
|---|---|---|---|---|---|
| 1 | moonshotai/kimi-k2.5 | **91.9** | 0.919 | 3.45 | **63.2** |
| 2 | claude-sonnet-4-6 | 91.7 | 0.917 | 3.45 | 62.6 |
| 3 | zai/glm-5 | 90.4 | **0.922** | **3.46** | 62.1 |

The leaderboard shows what a rigorous benchmark in this domain *should* show: even the best frontier models top out at ~63% truly correct. The gap between "produces valid syntax" and "produces a semantically right rule" is large and persistent.

## Why this matters

Most LLM-code benchmarks evaluate on HumanEval-style problems with clean unit tests. Detection engineering doesn't have unit tests — it has adversarial distribution drift, fuzzy correctness, and a strong asymmetry between syntactic and semantic failure. The MQL Benchmark is an attempt to evaluate that setting honestly, at scale, with a methodology other researchers can reproduce and extend.

The companion artifact is the [CAMLIS 2025 paper](/projects/camlis-2025), which introduced the precision/cost/robustness metric trio illustrated on a smaller corpus. This benchmark is the production-scale evaluation suite those ideas naturally extend into.

[Dataset on HuggingFace →](https://huggingface.co/datasets/sublime-security/mql-benchmark)
