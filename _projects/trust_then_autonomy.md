---
layout: page
title: Trust, Then Autonomy
description: A framework for evaluating earned autonomy in deployed AI systems
img: assets/img/trust_then_autonomy.png
importance: 1
category: AI Governance & Evaluation
---

*A framework I developed and presented at the [AKJ AI Security Summit](https://akjcybersecurity.com/akj-ai-security-summit/) on May 7, 2026. It's now the organizing principle for Sublime's AI Governance program and the basis for how we evaluate every model and agent we ship.*

**Read the materials**
- Blog: [Introducing a new framework for evaluating autonomy in security AI](https://sublime.security/blog/introducing-a-new-framework-for-evaluating-autonomy-in-security-ai/) (Sublime Security, May 13, 2026)
- Talk: *Trust, Then Autonomy* — AKJ AI Security Summit, May 7, 2026

## The problem

Across security AI, the marketing language has outpaced the engineering. "Autonomous" gets used for products that still require a human in the loop for every action. The result is a credibility gap: vendors promise autonomy, customers inherit risk, and there's no shared vocabulary for talking about either.

The deeper issue is conceptual. Most evaluation frameworks treat autonomy as a capability the vendor *grants* the product. It isn't. Autonomy is a property the customer *grants* the system, on the basis of evidence, over time. **The question is not "how autonomous is it?" but "what has it earned the right to do?"**

## A shared vocabulary: five levels of autonomy

| Level | Name | What it means |
|---|---|---|
| 1 | **Assisted** | AI surfaces information. Humans decide and act. Copilot, not autopilot. |
| 2 | **Guided** | AI recommends with reasoning shown. Human approval required before any action. |
| 3 | **Supervised** | AI acts within defined boundaries. Humans review asynchronously. Fallback and rollback tested. |
| 4 | **Conditional** | Autonomous in well-tested scenarios. Oversight at the boundary, not each action. |
| 5 | **Full autonomy** | Fully autonomous across well-understood scenarios. Reached only through demonstrated trust at every prior level. |

Two points the framework insists on:

1. **None of these levels are wrong.** A well-designed Level 2 system beats a poorly-designed Level 4 system every time. The goal is not to maximize autonomy. It's to match autonomy to evidence.
2. **Full autonomy cannot be purchased.** It is the destination of a trust relationship built incrementally between the system and its operators — not a product feature.

## The trust path: how autonomy is earned

Movement up the autonomy ladder requires movement up a parallel **evidence ladder**:

| Stage | Vendor maturity | What the customer should see |
|---|---|---|
| **Crawl** | Shipping on intuition | Demo-driven results, no version comparison, no eval strategy |
| **Walk** | Rigorous and repeatable | Defined benchmarks, tracked metrics, reproducible methodology |
| **Run** | Continuously improving | Performance curves over months, benchmarked against human analysts, improvement over time |

Earning autonomy then proceeds in three steps:

1. **Prove it works in your environment, not in demos.** Non-production environments do not expose the variability that comes with real-world adversaries.
2. **Show your work.** Operational evidence — not just benchmarks. What's the catch rate? The false positive rate? Why is it working?
3. **Keep humans in control while expanding autonomy incrementally.** Approval-for-all → asynchronous review → continuous evaluation with fewer guardrails → autonomous operation. At every step, the gating condition is accumulated evidence, not a product roadmap.

## Three architectural foundations

This progression only works if the system is built on three properties that must be present at every level:

- **Transparency** — how decisions are made must be visible.
- **Explainability** — every decision must come with a justified reason.
- **Auditability** — every action must be reconstructable.

A black box cannot earn Level 5 trust, no matter how impressive its efficacy numbers look.

## Six questions any AI deployment should be able to answer

These were written for security AI buyers, but they generalize to any evaluator of a deployed AI system — including frontier-AI risk teams, regulators, and internal safety reviewers:

1. Where does the product sit on the autonomy scale, and what happens at the boundary?
2. What does the AI get wrong, and how will I know when it happens in my environment?
3. Has it been red-teamed internally *and* externally?
4. Can I see the evaluation methodology, not just the results?
5. If it makes a wrong call at 3 AM, what's the blast radius and how do I roll it back?
6. If a regulator asks why it made a specific decision, what can you show them?

If a vendor — or a deployment — cannot answer these in detail, that *is* the answer.

## Why this matters beyond security

Security is inherently adversarial: the threat landscape is actively adapting to exploit the system. That property makes it an unusually demanding domain to deploy LLM agents into — and it surfaces failure modes that more benign deployments may not see for years. The framework was developed in that crucible, but the underlying logic — graduated deployment gated by evidence, with platform-level oversight that does not depend on model alignment — is domain-general.

This is not AI doomerism. It's AI optimism with discipline. You only get to full autonomy through trust. **Trust is earned, not claimed.**

## Companion artifacts

- [How Sublime's AI Agents Are Secure by Design](https://sublime.security/blog/how-sublimes-ai-agents-are-secure-by-design/) — the architectural deep-dive on what enforcing these principles looks like in a shipped agent system (ASA and ADÉ).
- [Evaluating LLM Generated Detection Rules in Cybersecurity](https://arxiv.org/abs/2509.16749) (CAMLIS 2025) — peer-reviewed methodology behind the "Walk → Run" evaluation rigor described above.
