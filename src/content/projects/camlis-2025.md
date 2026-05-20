---
title: "Evaluating LLM-Generated Detection Rules"
description: "A benchmark and three metrics for measuring LLM-generated cybersecurity rules — CAMLIS 2025."
date: "2025-09-20"
tags:
  - "Evaluation"
  - "LLMs"
  - "Cybersecurity"
external_url: "https://arxiv.org/abs/2509.16749"
---

Bertiger, **Filar**, Luthra, Meschiari, Mitchell, Scholten, Sharath — *Conference on Applied Machine Learning in Information Security* (CAMLIS), 2025. [arXiv:2509.16749](https://arxiv.org/abs/2509.16749).

## What the paper does

LLMs are being deployed all over the security pipeline, but the field has no shared way to measure whether their output is actually *good*. We introduce an open-source evaluation framework and three benchmark metrics for LLM-generated cybersecurity detection rules — the first peer-reviewed evaluation methodology for this class of artifact.

The framework is illustrated on Sublime's Automated Detection Engineer (ADÉ), an agentic system that writes detections in Message Query Language (MQL). We use a holdout methodology adapted from supervised learning: take a human-written rule from the [Sublime Core Feed](https://github.com/sublime-security/sublime-rules), remove it from ADÉ's knowledge base, and ask ADÉ to construct a detection for a known true positive that the human rule catches. Then compare.

The paper opens with the question detection engineers actually ask: *can the agent do the job, or does it produce "plausible-sounding nonsense"?* The three metrics are designed to answer that question rigorously.

## Three metrics, designed to mirror how experts evaluate rules

**1. Detection Accuracy.** A precision-based score over an expert-labeled corpus of emails:

$$\text{Score} = \frac{1}{2}\left(\frac{\#\text{TP}}{\#\text{TP}+\#\text{FP}} + \frac{\#\text{unique TP}}{\#\text{TP}+\#\text{FP}}\right)$$

The first term is standard precision. The second weighs *unique* true positives — malicious emails this rule catches that no other rule in the corpus catches. The blend captures both correctness and additive coverage, which is closer to how a detection engineer actually values a rule. (False negatives are deliberately not estimated; in security you generally don't know what you don't know.)

**2. Economic Cost of Syntactic Correctness.** A rule that doesn't parse cannot be evaluated. ADÉ enters a retry loop on validation failure, which costs money. We adapt the *cost-to-pass* formulation (Erol et al., 2025) to this setting:

$$v(m,p) = \frac{C_m(p)}{R_m(p)}, \qquad \text{Total Cost} = C_m(p) \times k$$

where $R_m(p)$ is the pass@1 rate of the MQL validator and $C_m(p)$ is the generation cost per attempt. The metric makes the economic cost of autonomy explicit — a property most LLM-coding benchmarks ignore, but one that determines whether a system can actually be deployed.

**3. Robustness of Query.** A heuristic for how susceptible a rule is to adversarial evasion. Adapted from RobGen (Li et al., 2025) but reframed for detection engineering: the failure mode is not buggy code, it's a rule an attacker can step around with a small change to the message.

## Why this matters for frontier AI

The methodology is domain-specific in its instantiation (MQL, email security rules), but the structure of the contribution is not. It's a worked example of what rigorous evaluation looks like when the artifact is *LLM-generated code that has to operate against an adversarial distribution*:

- **Precision blended with marginal coverage** — closer to how a human reviewer evaluates a generated artifact than aggregate accuracy.
- **Cost made explicit** — pass@k is incomplete; what matters operationally is the expected cost of getting to a valid output.
- **Robustness as adversarial susceptibility** — not just "does it work" but "does it still work after an attacker reads it."

These three dimensions — quality, cost-to-correct, and adversarial robustness — generalize to any setting where an LLM is asked to produce executable artifacts under adversarial pressure. That includes most of what *Frontier Red Team*-style and *Preparedness*-style evaluations are actually trying to measure in the cyber domain.

## Read it

- Paper: [arXiv:2509.16749](https://arxiv.org/abs/2509.16749) (preprint of the CAMLIS 2025 paper)
- Companion architectural deep-dive on ADÉ and ASA: [How Sublime's AI Agents Are Secure by Design](https://sublime.security/blog/how-sublimes-ai-agents-are-secure-by-design/)
- The graduated-trust deployment framework that determines what we *do* with the eval results: [Trust, Then Autonomy](/projects/trust-then-autonomy)
