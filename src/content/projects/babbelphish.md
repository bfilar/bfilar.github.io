---
title: "BabbelPhish"
description: "Accelerating Adoption of Domain-Specific Languages with Large Language Models."
date: "2023-08-01"
tags:
  - "LLMs"
  - "NLU"
external_url: "https://github.com/bfilar/babbelphish"
---

**BabbelPhish** is an experimental pipeline for fine-tuning an LLM to translate natural language descriptions into [Message Query Language (MQL)](https://docs.sublimesecurity.com/docs/message-query-language) — the domain-specific language used at Sublime Security for email detection. The project demonstrated that small fine-tuned models can credibly bridge the gap between an analyst's intent and the DSL needed to express it.

The repo includes:

- A fine-tuning workflow against the BabbelPhish dataset (see the companion [HuggingFace dataset](https://huggingface.co/datasets/sublime-security/babbelphish))
- A custom tokenizer trained on MQL and a Flask-based comparison webapp (GPT-2 / GPT-3 / GPT-4 / custom)
- Evaluation scripts computing `pass@k` and BLEU against a held-out test set
- Tokenizer-quality metrics (OOV rate, granularity, information loss, type ratio, reversibility)

Code: [github.com/bfilar/babbelphish](https://github.com/bfilar/babbelphish)
