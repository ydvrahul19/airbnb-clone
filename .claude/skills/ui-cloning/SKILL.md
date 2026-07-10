---
name: ui-cloning
description: >
  Use this skill whenever the task is to reproduce an existing reference UI
  (a live site, app, or design file) with high visual and behavioral
  fidelity — as opposed to designing something new. Covers the end-to-end
  workflow: inventory, data modeling, incremental build, visual
  verification, and accessibility, in that order.
---

# UI Cloning Methodology

Cloning an existing UI is a different task from original design work: the
goal is fidelity to a fixed reference, not creative exploration. Follow this
order; skipping steps causes rework later.

## 1. Inventory before building anything
Walk the reference and produce a structural table (screen → sections →
elements → interaction notes) before writing code. See the
`reference-inventory` agent. If part of the reference is inaccessible
(robots.txt, auth wall), get screenshots or an HTML export instead of
guessing from memory of "similar" sites — a generic mental model of "what
this kind of page usually looks like" produces confidently wrong details.

## 2. Separate content from structure
Put all reference-derived *content* (copy, prices, names) into a single data
file, and treat the *structure* (layout, spacing, component boundaries) as
the thing being cloned. This keeps the visual/behavioral clone faithful
while avoiding verbatim reproduction of the reference's actual text/IP —
important when the reference is a real commercial product.

## 3. Build in reviewable batches, not one giant pass
Group 3-5 related components per batch (e.g. "header + hero + title bar").
After each batch: build → screenshot → compare against the inventory row →
fix → move on. A single monolithic build pass defers all verification to
the end, where mismatches are expensive to trace back to their cause.

## 4. Verify behavior with a real browser, not by reading code
Static review of JSX/CSS cannot confirm a modal actually opens, that
keyboard arrows navigate a gallery, or that focus returns correctly on
close. Use headless browser automation for every stated interaction in the
inventory. Read `.claude/agents/visual-qa.md` for the concrete process,
including the constraint that a background dev server must be started and
exercised within the *same* shell invocation (it will not persist across
separate tool calls in most sandboxed environments).

## 5. Accessibility is a dedicated pass, not a checkbox during build
Keyboard nav, focus trapping/restoration, and ARIA semantics are easy to
half-implement (e.g. Escape closes a dialog but Tab still leaks focus to
the background). Run a focused pass after functional completeness using
`.claude/agents/accessibility-auditor.md`, and verify each item with
scripted interaction rather than visual inspection.

## Common pitfalls seen in this project (keep watching for these)
- Conditionally hiding UI that the reference actually shows
  unconditionally (verify against a screenshot, not assumption).
- Reusing a shared sub-component (e.g. a calendar) in two places on the
  page and then writing a test/selector that can't distinguish which
  instance it's checking — leads to false negatives when verifying fixes.
- Forgetting that removing a `console.log` or other temporary debug code
  added for diagnosis is part of the fix, not optional cleanup.
