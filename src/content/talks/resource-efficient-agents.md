---
title: "The Craft of Designing Resource-Efficient Agents"
date: "2026-06-05"
event: "Georgian AI Lab Substack (with Kshitij Jain, Aryan Luthra, Asna Shafiq)"
external_url: "https://georgianailab.substack.com/p/the-craft-of-designing-resource-efficient"
description: "A two-tier router architecture — fine-tuned open-weight model with uncertainty-based escalation to a frontier model — that cut ASA's median latency 16x and inference cost ~70% with no accuracy loss."
tags:
  - "Writing"
  - "Agentic Systems"
---

Co-authored with Georgian AI Lab, using ASA as the case study for scaling agents in production without scaling cost. The core idea: route by confidence, not by default. A fine-tuned open-weight model handles requests, and a frontier model is only invoked when the base model's own uncertainty signals warrant escalation.

Applied to ASA, this got roughly 16x lower median latency and about a 70% cut in inference cost, with accuracy holding at parity with a frontier-only baseline — savings that were reinvested into giving the escalation tier more tools for the harder cases it now handles. The post also walks through five concrete techniques for building the router itself: confidence labeling, a lesson store of past misclassifications, self-consistency checks, log probabilities, and a purpose-trained classifier.

Read: [Georgian AI Lab Substack](https://georgianailab.substack.com/p/the-craft-of-designing-resource-efficient)
