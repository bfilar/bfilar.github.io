---
title: "Secure-by-Design Agents"
description: "How we architected ASA and ADÉ for adversarial production."
date: "2026-04-09"
tags:
  - "Agentic Systems"
  - "AI Safety"
external_url: "https://sublime.security/blog/how-sublimes-ai-agents-are-secure-by-design/"
---

*An architectural deep-dive I wrote for the [Sublime Security blog](https://sublime.security/blog/how-sublimes-ai-agents-are-secure-by-design/) (April 9, 2026), describing the design decisions my team and I made when shipping ASA and ADÉ — Sublime's two production LLM agents — into adversarial customer environments. The post focuses on the half of the story most agent writeups skip: the guardrails.*

## The core architectural decision

> *"We don't rely on model alignment to enforce security policies. The authorization layer doesn't care how clever an attempted prompt injection is. It only cares whether the request has proper permissions. The agents can reason differently, but they can't act differently than their permissions allow."*

The dominant pattern in agent design today is *capability-first, security-later*: connect to as many tools as possible, grant implicit trust, hope the model behaves. The blast radius when something goes wrong scales with how much the agent can touch.

We made the opposite bet. Security is enforced by the platform — multi-tenancy isolation, role-based access control, data sovereignty — not by the agent's own judgment. The same permission checks that gate a human analyst gate an agent. Model alignment is treated as one defense layer, not the trust boundary.

This is the design principle that translates most directly to frontier-AI deployment: **defense should not depend on the model behaving.**

## The two agents

In 2025 Sublime shipped two production agents:

- **ASA (Autonomous Security Analyst)** triages user-reported emails and produces structured verdicts with tool-by-tool citations.
- **ADÉ (Autonomous Detection Engineer)** generates new detections in MQL (Sublime's domain-specific language), runs backtests, and surfaces results with precision scores and reasoning summaries. (Evaluation methodology: [CAMLIS 2025](/projects/camlis-2025).)

Both run on AWS Bedrock within the customer's deployment region. No email content leaves the customer instance. No data goes to third-party model providers.

## Four design principles

### 1. Built for one job, not every job

ASA and ADÉ are purpose-built for email security. That constraint is the foundation of the security posture — not a limitation.

Unlike general-purpose agents designed to roam across an enterprise, our agents operate within the Sublime platform boundary. They cannot call arbitrary APIs, browse the web, install plugins, or connect to external services. There is no plugin marketplace to poison. There is no tool chain to exploit. The attack surface is fixed and the boundary is enforced by infrastructure, not by the agent's own discretion.

ASA's tool set is the exact set of tools available to a human Sublime analyst — file explosion, link analysis, NLU, sender history, logo detection, screenshot analysis. ADÉ's output surface is a single DSL whose syntax is independently validated before any rule runs.

### 2. Platform-enforced authorization, not model alignment

This is the architectural decision that matters most. Every action an agent takes is subject to the same permission checks as a human analyst making the same request. The authorization layer is between the agent and the resource, not between the prompt and the model.

The practical consequence: even if an adversary successfully manipulates an agent's reasoning, the compromised agent cannot do what its permissions don't allow. Alignment failure is not catastrophic — it is contained.

### 3. Prompt injection mitigated, not ignored

Indirect prompt injection — malicious content in an email manipulating the agent analyzing it — is the risk that makes security AI categorically different from other LLM deployments. Most automated systems face a static threat environment. Ours doesn't: an attacker who understands how the agent reasons can probe its decision boundaries and craft inputs designed to exploit the gap.

There is no perfect defense against prompt injection today. We layer protections to make attacks significantly harder and contain the damage when they succeed:

- **Architectural separation** between system instructions and user input via AWS Bedrock's Converse API — email content is isolated from the agent's control flow.
- **Structured prompts** with explicit boundaries between instructions and data.
- **Controlled input sources** — all input arrives through well-defined tool outputs with expected formats, not freeform text.

Each layer raises the cost of an attack. The platform authorization layer (principle 2) bounds the damage when one succeeds. *Defense in depth, with the assumption that any individual layer can fail.*

### 4. Graduated autonomy with configurable gates

Both agents ship in human-in-the-loop mode by default. ASA has three explicit modes — *autonomous with remediation*, *autonomous without remediation (analyst-in-the-loop)*, and *disabled*. ADÉ proposes detections that route to human review unless they clear a customer-defined precision threshold.

Moving to higher autonomy is something organizations do *deliberately, based on demonstrated evidence* — not something that happens automatically. The gating logic is the one I formalized in [*Trust, Then Autonomy*](/projects/trust-then-autonomy): autonomy is granted by the customer, not declared by the vendor.

## Transparent, auditable, recoverable

Every decision is logged. Every verdict includes structured reasoning with tool-by-tool citations showing what evidence was found and how the conclusion was reached. Every generated detection ships with backtest results and a precision score.

If an agent's reasoning seems off — whether from drift, injection, or any other cause — the explanation makes the problem visible. We treat *detection, response, and rollback* as core safety layers, not nice-to-haves. Visibility without control is not enough.

## Why this matters beyond email security

The same questions a security team asks of an LLM agent are the questions any deployer of frontier AI should be able to answer:

1. *What can the agent access?*
2. *What actions can it take?*
3. *Can you see exactly what it did?*
4. *Where does the data go?*
5. *Who controls the agent's autonomy?*

If those answers depend on the model behaving, the architecture is incomplete. If they're answered by the platform, the architecture has done its job.

## Companion artifacts

- The full architectural deep-dive: [How Sublime's AI Agents Are Secure by Design](https://sublime.security/blog/how-sublimes-ai-agents-are-secure-by-design/) (Sublime, April 2026)
- The deployment framework that determines *when* the autonomy gates are opened: [Trust, Then Autonomy](/projects/trust-then-autonomy)
- The evaluation methodology behind ADÉ's quality gating: [CAMLIS 2025](/projects/camlis-2025)
