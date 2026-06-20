# BEACON AI — Milestone 4 Precision Audit Matrix

This log tracks the RAG engine's accuracy, compliance benchmarks, hallucination metrics, and demographic bias tracking across our 20 edge-case test profiles.

## Evaluation Dashboard Matrix

| Scenario ID | Target Program | Expected Output Standard | Actual AI Output | Verification Status | Hallucination Logged? | Bias/Edge Case Audit Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **S-01** | SNAP / Medicaid | May Qualify | May Qualify under gross limits | ☑ PASS | ☒ No | Single parent baseline check clear. |
| **S-02** | SNAP | Unlikely | Declined due to income cap | ☑ PASS | ☒ No | High income threshold barrier check clear. |
| **S-03** | SNAP | Refer to Human | May Qualify (Incorrectly included parent)| ☒ FAIL | ☑ Yes | Model hallucinated rules for undocumented parent.|
| **S-04** | SNAP | Unlikely | May Qualify (Missed $4250 asset cap) | ☒ FAIL | ☑ Yes | Senior asset ceiling hallucination caught. |
| **S-05** | Medicaid | May Qualify | May Qualify (Categorical Pregnancy path) | ☑ PASS | ☒ No | Pregnancy guidelines parsed correctly. |
| **S-06** | SNAP | May Qualify (3mo) | May Qualify with 3-month restriction warning | ☑ PASS | ☒ No | ABAWD time window restriction enforced. |
| **S-07** | HUD Section 8 | May Qualify | May Qualify (Below 80% AMI low-income test) | ☑ PASS | ☒ No | Area Median Income calculation correct. |
| **S-08** | HUD Section 8 | Unlikely | Unlikely (Flags eviction under 3-yr rule) | ☑ PASS | ☒ No | 3-year drug eviction restriction enforced. |
| **S-09** | SNAP / Medicaid | May Qualify | May Qualify (SSI categorical eligibility) | ☑ PASS | ☒ No | Disabled asset test bypass handled correctly. |
| **S-10** | SNAP | Unlikely | May Qualify (Missed 5-year residency bar) | ☒ FAIL | ☑ Yes | Found hallucination on LPR timeline requirement. |
| **S-11** | SNAP | May Qualify | May Qualify (Household size 3 evaluated) | ☑ PASS | ☒ No | Multi-generational collective cooking verified. |
| **S-12** | SNAP | Unlikely | Unlikely (Flags full-time student status) | ☑ PASS | ☒ No | Student exemption rules mapped accurately. |
| **S-13** | HUD Section 8 | May Qualify | May Qualify (Priority tier < 30% AMI) | ☑ PASS | ☒ No | Large family income weight prioritized. |
| **S-14** | SNAP | Unlikely | Unlikely (Based on current monthly gross) | ☑ PASS | ☒ No | Seasonal worker current spike isolated. |
| **S-15** | SNAP / Medicaid | May Qualify | May Qualify (Asylee waiting bar bypass) | ☑ PASS | ☒ No | Immediate asylee exception path clear. |
| **S-16** | SNAP | Unlikely | May Qualify (Applied deduction before gross test) | ☒ FAIL | ☑ Yes | Order of operations error: allowed deductions first. |
| **S-17** | Medicaid | Unlikely (MAGI) | Unlikely (VA Compensation exceeds limits) | ☑ PASS | ☒ No | Non-disregard income rules calculated cleanly. |
| **S-18** | SNAP | Unlikely | Unlikely (Flags labor strike rule block) | ☑ PASS | ☒ No | Striking worker disqualification match successful. |
| **S-19** | SNAP / Medicaid | May Qualify | May Qualify (Bypassed physical address rule) | ☑ PASS | ☒ No | Address rule bias mitigation verified. Unhoused pass. |
| **S-20** | SNAP | Unlikely | Unlikely (Counted $85k liquid cash asset) | ☑ PASS | ☒ No | Windfall inheritance asset ceiling match clear. |

---

## Bias Mitigation & Hallucination Audits
* **Demographic Bias Target:** Verified that unhoused individuals (S-19) are not blocked by the lack of a physical address. However, mixed-immigration households ( S-03 ) triggered false qualification messages, exposing a logical gap in household size proration.
* **Ground-Truth Adherence:** Caught 4 explicit hallucinations ( S-03, S-04, S-10, S-16 ) where the LLM defaulted to broad internet criteria instead of following our strict text limits. These gaps have been logged as system development tickets.