# BEACON AI Evaluation Matrix: 20 Test QA Scenarios

### Scenario 1: Low-Income Single Parent
* **User Profile:** Single parent, 2 children, gross monthly income of $1,100, Texas resident. Liquid assets: $500 checking.
* **Target Programs:** SNAP, Medicaid.
* **Expected Output:** `may_qualify` for SNAP and Children's Medicaid.

### Scenario 2: Individual Over Income Threshold
* **User Profile:** Single individual, no dependents, gross monthly income of $4,500, California resident.
* **Target Programs:** SNAP.
* **Expected Output:** `unlikely` to qualify.

### Scenario 3: Mixed Immigration Status Household
* **User Profile:** Married couple, 1 child. One parent is an undocumented immigrant, the other is an LPR of 6 years. Income: $1,800/month.
* **Target Programs:** SNAP.
* **Expected Output:** `refer_to_human` / `low` confidence threshold flag.

### Scenario 4: Senior Citizen Asset Limitation
* **User Profile:** Age 67, single. Gross monthly retirement income: $1,200. Savings: $5,000.
* **Target Programs:** SNAP.
* **Expected Output:** `unlikely` to qualify due to resource limits exceeding the elderly cap of $4,250.

### Scenario 5: Pregnant Individual in Non-Expansion State
* **User Profile:** Pregnant individual, zero income, residing in a non-expansion state.
* **Target Programs:** Medicaid.
* **Expected Output:** `may_qualify` under dedicated categorical eligibility channels for pregnancy.

### Scenario 6: Able-Bodied Adult Without Dependents (ABAWD)
* **User Profile:** Age 25, single, unemployed, zero income, works 0 hours.
* **Target Programs:** SNAP.
* **Expected Output:** `may_qualify` with strict time constraint warning (limited to 3 months of benefits).

### Scenario 7: High Area Median Income Section 8 Applicant
* **User Profile:** Family of 4, gross income $55,000/year. Area Median Income (AMI) is $100,000.
* **Target Programs:** HUD Section 8.
* **Expected Output:** `may_qualify` under Very Low-Income baseline (55% is below 80% AMI).

### Scenario 8: Recent Drug-Related Eviction Case
* **User Profile:** Single male, income $800/month, evicted from public housing 14 months ago for drug activity.
* **Target Programs:** HUD Section 8.
* **Expected Output:** `unlikely` to qualify due to strict 3-year statutory ban.

### Scenario 9: Disabled Individual under Asset Threshold
* **User Profile:** Age 45, receiving SSI ($943/month), liquid resources total $1,500.
* **Target Programs:** SNAP, Medicaid.
* **Expected Output:** `may_qualify` for both programs.

### Scenario 10: Legal Permanent Resident under 5-Year Bar
* **User Profile:** Adult, legal permanent resident for 2 years, income $900/month.
* **Target Programs:** SNAP.
* **Expected Output:** `unlikely` to qualify due to 5-year federal waiting bar.

### Scenario 11: Multi-Generational Household
* **User Profile:** Grandmother (65), daughter (30), grandson (5). Total combined income: $2,200/month. They prepare food together.
* **Target Programs:** SNAP.
* **Expected Output:** `may_qualify` (Household size 3).

### Scenario 12: Working Student Rule Conflict
* **User Profile:** Age 20, enrolled full-time in university, working part-time earning $800/month. No dependents.
* **Target Programs:** SNAP.
* **Expected Output:** `unlikely` to qualify unless meeting explicit student exemptions.

### Scenario 13: Large Family HUD Qualification
* **User Profile:** Household of 7,total gross income $35,000/year.
* **Target Programs:** HUD Section 8.
* **Expected Output:** `may_qualify` with high prioritization (Extremely Low-Income baseline).

### Scenario 14: Seasonal Worker Over Income Limit
* **User Profile:** Single farm worker, gross income last month was $3,200 due to harvest season (average yearly is $15,000).
* **Target Programs:** SNAP.
* **Expected Output:** `unlikely` to qualify for the current cycle based on rigid current monthly calculations.

### Scenario 15: Asylee Status Immediate Eligibility
* **User Profile:** Individual granted official political asylum 3 months ago. Current income: $400/month.
* **Target Programs:** SNAP, Medicaid.
* **Expected Output:** `may_qualify` (Asylees are exempt from the 5-year waiting bar).

### Scenario 16: Family with High Child Care Deductions
* **User Profile:** Family of 3, gross income is $2,600/month (slightly above 130% FPL). Out-of-pocket childcare costs are $800/month.
* **Target Programs:** SNAP.
* **Expected Output:** `unlikely` to qualify (must pass gross income test before deductions apply).

### Scenario 17: Veteran with VA Disability Income
* **User Profile:** Veteran, single, receives 100% VA disability compensation ($3,800/month).
* **Target Programs:** Medicaid.
* **Expected Output:** `unlikely` to qualify under MAGI adult category due to high monthly income.

### Scenario 18: Striking Worker Eligibility Check
* **User Profile:** Married couple, 2 children. On strike from manufacturing job. Income dropped to $500/month strike pay.
* **Target Programs:** SNAP.
* **Expected Output:** `unlikely` to qualify / `refer_to_human` (Federal strike rules apply).

### Scenario 19: Unhoused Individual without Postal Address
* **User Profile:** Single individual, unhoused, zero income, zero assets, no permanent mailing address.
* **Target Programs:** SNAP, Medicaid.
* **Expected Output:** `may_qualify` (Lack of permanent address cannot be used to deny baseline eligibility).

### Scenario 20: Excess Liquid Wealth with Low Earned Income
* **User Profile:** Single individual, working part-time earning $400/month. Inherited savings account contains $85,000 liquid cash.
* **Target Programs:** SNAP.
* **Expected Output:** `unlikely` to qualify due to asset violation.