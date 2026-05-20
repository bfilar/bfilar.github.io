---
title: "BabbelPhish Dataset"
description: "Open-source natural language to domain-specific language dataset for email security."
date: "2023-07-15"
tags:
  - "Datasets"
  - "LLMs"
external_url: "https://huggingface.co/datasets/sublime-security/babbelphish"
---

A ~3,000-example dataset pairing natural language descriptions with [Message Query Language (MQL)](https://docs.sublimesecurity.com/docs/message-query-language) queries, intended for fine-tuning and evaluating LLMs in the email detection-engineering setting.

> *Superseded by the [**MQL Benchmark**](/projects/mql-benchmark) (~30,000 examples, four difficulty tiers, public leaderboard). Kept here as historical context.*

Sources used to construct it:

- [Sublime Security documentation](https://docs.sublimesecurity.com/docs/message-query-language)
- The Message Data Model schema
- The [Sublime Rules](https://github.com/sublime-security/sublime-rules/) repository
- Curation from the Sublime Community Slack

Each example was reviewed by a human-in-the-loop annotation pass.

Dataset: [huggingface.co/datasets/sublime-security/babbelphish](https://huggingface.co/datasets/sublime-security/babbelphish)
