---
title: "Evaluating Agentic Learning Harness Capabilities Without Labels via the Scaling Hypothesis"
description: "A label-free evaluation framework for continual learning harnesses in cybersecurity, grounded in the scaling hypothesis — CAMLIS 2025."
date: "2026-08-11"
tags:
  - "Evaluation"
  - "LLMs"
  - "Cybersecurity"
external_url: "https://arxiv.org/abs/2608.13608"
---

Luthra, Jain, Arya, **Filar**, Bertiger — *Conference on Applied Machine Learning in Information Security* (CAMLIS), 2025. [arXiv:2608.13608](https://arxiv.org/abs/2608.13608).

## What the paper does

Agentic "Continual Learning Harnesses" — systems that pair an LLM with retrieval or memory to improve from feedback without retraining — are seeing growing use in cybersecurity. The usual way to measure whether a harness actually helps is to score it against a labeled benchmark, but in operational security settings that benchmark rarely exists: labels are scarce, stale, and unrepresentative of what a practitioner is actually facing. LLM-as-a-judge doesn't rescue this, either — a judge model is no stronger than the agent it's evaluating, so it offers little usable signal between similarly-powered models.

We propose evaluating a learning harness end-to-end *without* a labeled benchmark, grounded in the scaling hypothesis. A stronger teacher model provides sparsely sampled corrections to a smaller student running the harness under test. We then score the harness by how much its student converges toward the teacher over time — teacher-relative lift as a proxy for true uplift.

## Why teacher-relative lift is a valid proxy

The core empirical claim: across security tasks, model families, and harness designs, **improvement relative to the teacher correlates with improvement relative to a held-out gold standard.** That correlation is what licenses using the teacher as a stand-in for ground truth when ground truth is unavailable. We also show the negative result that motivates the whole approach — LLM-as-a-judge between similarly powered models yields no usable signal, so you need a genuine capability gap (teacher vs. student), not just a second opinion, to get a measurement.

A further implication: if a teacher-sized model can itself be improved by the same harness given the same kind of sparse, high-precision corrections, then the corrections don't have to come from a stronger model at all — they can come from humans. That reframes the harness itself as a general mechanism for turning scarce expert feedback into measurable capability gains, not just a way to bootstrap a smaller model off a larger one.

## Why this matters for deploying agents in adversarial settings

This is the label-free companion to the [CAMLIS 2025 evaluation-of-generated-rules paper](/projects/camlis-2025): that paper assumes a labeled corpus exists to score an agent's output against; this one is for the more common case where it doesn't. Together they cover the two evaluation regimes practitioners actually hit when deploying LLM agents in security — score against ground truth when you have it, and use scaling-relative lift against a stronger teacher when you don't.

## Read it

- Paper: [arXiv:2608.13608](https://arxiv.org/abs/2608.13608)
- Companion paper (labeled setting): [Evaluating LLM-Generated Detection Rules](/projects/camlis-2025)
- The measurement discipline this feeds: [AI Safety Evolved](/projects/ai-safety-evolved)
