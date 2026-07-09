---
title: "AI Safety Evolved: Secure-by-Design, Safe-by-Measurement"
description: "Four engineering pillars, a maturity checklist, and the concrete artifacts, gates, and numbers behind Sublime's AI safety program."
date: "2026-06-30"
tags:
  - "AI Safety"
  - "Evaluation"
  - "Agentic Systems"
external_url: "https://sublime.security/blog/ai-safety-evolved-secure-by-design-safe-by-measurement/"
---

*Co-authored with Aryan Luthra (ML Research) for the [Sublime Security blog](https://sublime.security/blog/ai-safety-evolved-secure-by-design-safe-by-measurement/) (June 30, 2026). This is the piece I'd point to first if someone wants to see the evaluate/secure/govern thesis expressed as engineering, not principle.*

## The premise

In an AI-augmented work environment, adversaries are no longer just targeting your users — they're targeting your models. We'd already written about this from two angles: [how Sublime's agents are secure by design](/projects/secure-by-design-agents), and the [trust-based framework for agentic autonomy](/projects/trust-then-autonomy). Those posts laid out what AI safety *should* look like in security. This one is about how we audit ourselves against it — and a real [in-the-wild prompt injection sample](/projects/prompt-injection-in-the-wild) that motivated some of it.

Security AI is an unusual deployment surface, and it forces a stricter bar for safety than most AI products need. Most AI systems assume input is safe (*"summarize this document"*). Security systems have to assume input is *unsafe by default* (*"find the malicious signals in this email"*) — because the input was authored by the same adversary the system exists to catch.

AI safety in product contexts is too often discussed as values or principles. We treat it as an engineering discipline with **artifacts, gates, and numbers**:

- **Artifacts** — inputs and outputs must be contextualized and secure the agent loop. All decisions must be auditable.
- **Gates** — there must be deterministic checks throughout the entire agent loop.
- **Numbers** — there must be evals in place that measure AI efficacy, speed, and safety to enable continuous improvement.

## A maturity checklist for deploying AI against attacker-authored content

Some controls are table stakes before any automation. Others become mandatory as the system moves from advisory workflows to constrained or high-impact autonomous action.

**Baseline controls** — these should exist before any AI system is trusted to analyze adversarial production content:

- **Prompt-injection eval corpus.** Not just a policy document — a corpus of real and synthetic adversarial examples used to test how the system handles attacker-authored instructions.
- **Decision provenance.** Every meaningful AI-assisted security decision should leave enough of a trail to be reviewed later: what input was analyzed, what the model concluded, what confidence or evidence informed the decision.
- **Internal red team aimed at the agent.** Red teams need to attack the agents as hard as they attack the detection engine. Confirmed bypasses should become regression tests, not incidents that have been quietly deferred by the vendor.

**Controls for higher autonomy** — these matter more as the system moves from advisory workflows into actions that affect users, mailboxes, detections, or customer environments:

- **Calibration report.** When the model says *high confidence*, how often is it right? If a vendor can't show how confidence maps to correctness, they haven't measured whether the system is safe to automate.
- **Autonomy tier policy.** There must be controls over which actions the agent can take unilaterally, which require shadow mode, and which require human sign-off — and the system needs to provide evidence of success and failure so practitioners can decide when to move between levels.

**Advanced operational controls** — signs of a mature AI safety program, especially for systems operating with meaningful autonomy:

- **Circuit breaker.** Models should have named thresholds where the agent stops itself, escalates, or returns an error instead of forcing a low-confidence decision — with a named human or team responsible for reviewing those failures.

## Four pillars of AI safety

We operate under four pillars: **adversarial input, calibrated output, tiered autonomy, symmetric red-teaming.** Each names what we already do, what we measure, and the failure mode it exists to prevent.

| Pillar | What exists | What we measure | Failure mode it targets |
|---|---|---|---|
| **Adversarial input** | MDM trust boundaries and a corpus of in-the-wild prompt-injection samples | Whether model, prompt, or agent changes improve or regress on adversarial email content | Attacker-authored content influences the agent instead of being analyzed as evidence |
| **Calibrated output** | Verdicts with confidence, unknown handling, canary sets, and anti-rationalization rubrics | Calibration, Brier score, verdict accuracy, and uncertainty behavior | The model sounds confident when it should ask for review |
| **Tiered autonomy** | Passive/active modes, review paths, and configurable autonomy | Accuracy, false positives, regression deltas, and safe movement between autonomy levels | The system moves faster with autonomy than the evidence supports |
| **Symmetric red-teaming** | Internal testing, third-party pentests, and production false-negative review | Bypasses, rubric failures, trust-boundary failures, and regression examples | Attackers manipulate the agent surface, not just the detection engine |

### Pillar 1: The input is the adversary

We don't ask our agents to be perfect and unbreakable. We ask them to fail in known, measured, recoverable ways.

**What we do today:**

- **Agent guardrails.** Email content is structurally separated from agent instructions at the prompt layer. The model is explicitly told to treat anything inside the email as *evidence to analyze*, never as a command to follow — regardless of how it's phrased. Tools are read-only by design: URL reputation lookups, header parsing, sender analysis — no write access, no external API calls. Agents cannot be weaponized to act on what they read.
- **Trust boundaries.** Sublime parses messages into a JSON-style Message Data Model (MDM). When agents interact with the MDM, attacker-controlled fields — subject, body, links, attachments — are marked as untrusted content, not treated as instructions. We test for cases where attacker-authored content attempts to influence control flow, override the agent's task, or change how the message is evaluated.
- **Typed refusal.** When an agent doesn't have confidence in its analysis, it returns an `unknown` verdict for human review, rather than guessing. Automations exist to enable automatic alerting of analysts.
- **Behavioral-over-authority (BOA) hierarchy.** Signals of authority — trusted brands, trusted infrastructure — never outweigh behavioral analysis. Agents operate under the understanding that trust is not a shortcut for analysis.

**What's on the roadmap:** publish a prompt-injection taxonomy and invite practitioners to use and contribute to it; topic-based guardrails for future agents.

### Pillar 2: Calibrated output, not confident output

AI is known for misplaced confidence, so one of our design properties is *honest uncertainty*. Every verdict comes with a confidence level — as important as the verdict itself, since it has the ability to flip verdicts and gives the model the ability to ask for help when needed.

**What we do today:**

- **Verdicts with `confidence`.** Every verdict comes with a confidence value. Below a certain threshold, the verdict automatically returns as `unknown`.
- **Anti-rationalization rubrics (ARRs).** As part of CI, we evaluate decisions against ARRs to uncover and resolve logical fallacies and hallucinations.

**What we measure:**

- A **calibration curve** measuring reliability per verdict — *how correct* we are, so we can improve the model. If an agent marks 1,000 messages as `verdict:malicious` + `confidence:high` in a held-out set, we measure how often those verdicts are confirmed by human-labeled ground truth. If high-confidence-malicious accuracy is 97% one month but drops to 91% after a model change, that regression blocks release. Confidence boundaries are applied to all confidence scores to ensure precision for each level.
- **Brier scoring** to measure how close we are to a predicted outcome — when a verdict is wrong, we measure *how wrong* it is.
- **Counterfactual stress testing** to see what changes to an email change agent verdicts — finding gaps before attackers do.
- A **held-out canary set** the model never sees, creating a baseline for evaluating model decisions.

**What's next:** publish the calibration report cadence and commit to regressions blocking releases.

### Pillar 3: Tiered autonomy, applied to ourselves

Autonomy isn't a slider you turn up. It's a spectrum with levels you earn — per agent, per action, with evidence. Our agents aren't a binary; they give teams the ability to build trust and then ramp up autonomy on their own timeline. (This is the operational form of [*Trust, Then Autonomy*](/projects/trust-then-autonomy).)

**What we do today:** our agents have configurable autonomy settings, and all agents are transparent, explainable, and auditable to ensure trust can be built and autonomy grown.

- **ASA.** *Passive mode* guides human analysts but doesn't take actions. *Active mode* lets teams ramp up autonomy from providing recommendations to automated actions within user-defined boundaries, up to full autonomy within the agent harness.
- **ADÉ.** Analysis can run automatically or be manually triggered. By default, newly generated coverage must be reviewed by an analyst, but can be configured to auto-accept for full autonomy.

**What we measure:** we continuously evaluate verdict accuracy and model calibration. We generate custom evals for specific security tasks and continuously benchmark performance against them, using a regression delta to measure prompt-injection safety efficacy. We measure false positive rates during the iterative process of new-coverage generation to maximize efficacy.

**What's next:**

- **Decision provenance** including model, prompt, rubric, and tools used — internal-first, so support engineers can troubleshoot agent decisions with customers.
- A **circuit breaker** that pauses the agent loop on out-of-distribution decision rates, returning an `error` rather than providing a hallucinated decision.

### Pillar 4: Symmetric red-teaming

Most security vendors red-team their detection engine. But attackers do more than try to evade detection — they also try to manipulate the systems that analyze their messages. So we also red-team our agents. For us, red-teaming the agent means checking whether the model not only makes the right decision, but whether attacker-created content can affect *how* it gets to that decision.

**What we do today:** we regularly review production false negatives and threat-hunting results to find cases where attacker-created content tries to manipulate AI analysis. We also test the agent surface directly — prompt-injection and decision-manipulation resistance, MDM trust boundaries, tool-use limits, and autonomy controls — using both internal tests and third-party pentests.

**What's next:**

- Build an **internal attacker agent** designed to create emails that ASA marks as safe but which contain malicious payloads. This attacker agent will focus on specific parts of the agent surface — prompt-injection handling, confidence calibration, MDM trust boundaries, rubric weaknesses. Any successful bypasses will be reviewed, labeled, and added to the adversarial corpus as regression examples.
- Add **capability forecasts for model upgrades** that explain what has changed in safety-relevant behavior.

## Living our AI truth

We taught our model to be honest, so we practice what we preach. Where we still have room to improve:

- **Interpretability of individual verdicts.** We currently don't rank detection signals for verdicts — we can't yet say "because of signal X, we know this is malicious." This has been a lower-priority build, a direct consequence of the detection engine being designed for signal completeness (maximum security data) over signal-analysis short-circuiting (minimum compute).
- **Complete prompt injection prevention.** No AI model is completely safe from prompt injection, because adversaries — and their adversarial AI agents — are constantly developing novel attack methodologies. Pillar 3 (tiered autonomy) exists precisely because of this fact, not despite it.

## Ending where we started

Go back to the [phishing campaign with the fake browser-metadata injection](/projects/prompt-injection-in-the-wild). With attacks like that, ASA doesn't just provide a verdict — it provides transparency and explainability that goes a long way with security teams: a full summary from analysis. You don't have to have faith that the verdict is correct. You can see exactly why the system came to that verdict, and if you disagree, you can audit the reasoning.

This is how AI security vendors — and, more broadly, any deployer of frontier AI into adversarial production — earn trust.

## Companion artifacts

- [Sublime blog post](https://sublime.security/blog/ai-safety-evolved-secure-by-design-safe-by-measurement/) (June 30, 2026)
- [Secure-by-Design Agents](/projects/secure-by-design-agents) — the architecture these pillars are measured against
- [Trust, Then Autonomy](/projects/trust-then-autonomy) — the framework Pillar 3 operationalizes
- [Prompt Injection in the Wild](/projects/prompt-injection-in-the-wild) — the real attack sample that feeds Pillar 1 and Pillar 4's adversarial corpus
