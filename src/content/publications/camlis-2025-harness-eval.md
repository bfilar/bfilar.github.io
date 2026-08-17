---
title: "Evaluating Agentic Learning Harness Capabilities Without Labels via the Scaling Hypothesis"
author: "Aryan Luthra, Kshitij Jain, Siddharth Arya, Bobby Filar, Anna Bertiger"
date: "2026-08-11"
journal: "Conference on Applied Machine Learning in Information Security (CAMLIS) 2025"
external_url: "https://arxiv.org/abs/2608.13608"
description: "A label-free evaluation framework for continual learning harnesses in cybersecurity, using teacher-relative lift as a proxy for uplift against a held-out gold standard."
tags:
  - "LLMs"
  - "Evaluation"
  - "Cybersecurity"
---

Agentic continual learning harnesses are increasingly used in cybersecurity, but conventional evaluation against labeled benchmarks breaks down when labels are scarce, stale, or unrepresentative. This paper proposes evaluating a harness end-to-end without a labeled benchmark, grounded in the scaling hypothesis: a stronger teacher model provides sparsely sampled corrections to a smaller student running the harness, and the harness is scored by how much the student converges toward the teacher over time.

Across security tasks, model families, and harness designs, teacher-relative lift correlates with improvement against a held-out gold standard, validating it as a usable proxy when ground truth is unavailable — while LLM-as-a-judge between similarly powered models is shown to yield no usable signal.

[arXiv:2608.13608](https://arxiv.org/abs/2608.13608)
