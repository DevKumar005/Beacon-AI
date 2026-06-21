export const SCENARIOS = [
  {
    id: 1,
    name: "Low-Income Single Parent",
    profile: "Single parent, 2 children, $1,100/mo income, Texas resident, $500 assets.",
    targetPrograms: ["SNAP", "Medicaid"],
    expectedOutput: "may_qualify"
  },
  {
    id: 2,
    name: "Individual Over Income Threshold",
    profile: "Single individual, no dependents, $4,500/mo income, California resident.",
    targetPrograms: ["SNAP"],
    expectedOutput: "unlikely"
  },
  {
    id: 3,
    name: "Mixed Immigration Status Household",
    profile: "Married couple, 1 child, undocumented/LPR parents, $1,800/mo income.",
    targetPrograms: ["SNAP"],
    expectedOutput: "refer_to_human"
  },
  {
    id: 4,
    name: "Senior Citizen Asset Limitation",
    profile: "Age 67, single, $1,200/mo retirement, $5,000 savings.",
    targetPrograms: ["SNAP"],
    expectedOutput: "unlikely"
  },
  {
    id: 5,
    name: "Pregnant Individual in Non-Expansion State",
    profile: "Pregnant, zero income, non-expansion state.",
    targetPrograms: ["Medicaid"],
    expectedOutput: "may_qualify"
  },
  {
    id: 6,
    name: "Able-Bodied Adult Without Dependents (ABAWD)",
    profile: "Age 25, single, unemployed, zero income.",
    targetPrograms: ["SNAP"],
    expectedOutput: "may_qualify"
  },
  {
    id: 7,
    name: "High Area Median Income Section 8 Applicant",
    profile: "Family of 4, $55,000/yr income, AMI $100,000.",
    targetPrograms: ["HUD Section 8"],
    expectedOutput: "may_qualify"
  },
  {
    id: 8,
    name: "Recent Drug-Related Eviction Case",
    profile: "Single, $800/mo, evicted 14 months ago for drug activity.",
    targetPrograms: ["HUD Section 8"],
    expectedOutput: "unlikely"
  },
  {
    id: 9,
    name: "Disabled Individual under Asset Threshold",
    profile: "Age 45, SSI ($943/mo), $1,500 assets.",
    targetPrograms: ["SNAP", "Medicaid"],
    expectedOutput: "may_qualify"
  },
  {
    id: 10,
    name: "Legal Permanent Resident under 5-Year Bar",
    profile: "LPR for 2 years, $900/mo income.",
    targetPrograms: ["SNAP"],
    expectedOutput: "unlikely"
  },
  {
    id: 11,
    name: "Multi-Generational Household",
    profile: "Grandmother(65), daughter(30), grandson(5), $2,200/mo income.",
    targetPrograms: ["SNAP"],
    expectedOutput: "may_qualify"
  },
  {
    id: 12,
    name: "Working Student Rule Conflict",
    profile: "Age 20, full-time student, $800/mo part-time income.",
    targetPrograms: ["SNAP"],
    expectedOutput: "unlikely"
  },
  {
    id: 13,
    name: "Large Family HUD Qualification",
    profile: "Household of 7, $35,000/yr income.",
    targetPrograms: ["HUD Section 8"],
    expectedOutput: "may_qualify"
  },
  {
    id: 14,
    name: "Seasonal Worker Over Income Limit",
    profile: "Single farm worker, $3,200 last month, $15k average/yr.",
    targetPrograms: ["SNAP"],
    expectedOutput: "unlikely"
  },
  {
    id: 15,
    name: "Asylee Status Immediate Eligibility",
    profile: "Granted asylum 3 months ago, $400/mo income.",
    targetPrograms: ["SNAP", "Medicaid"],
    expectedOutput: "may_qualify"
  },
  {
    id: 16,
    name: "Family with High Child Care Deductions",
    profile: "Family of 3, $2,600/mo income, $800/mo childcare cost.",
    targetPrograms: ["SNAP"],
    expectedOutput: "unlikely"
  },
  {
    id: 17,
    name: "Veteran with VA Disability Income",
    profile: "Veteran, single, $3,800/mo VA disability income.",
    targetPrograms: ["Medicaid"],
    expectedOutput: "unlikely"
  },
  {
    id: 18,
    name: "Striking Worker Eligibility Check",
    profile: "Married, 2 kids, on strike, $500/mo strike pay.",
    targetPrograms: ["SNAP"],
    expectedOutput: "refer_to_human"
  },
  {
    id: 19,
    name: "Unhoused Individual without Postal Address",
    profile: "Unhoused, zero income/assets, no mailing address.",
    targetPrograms: ["SNAP", "Medicaid"],
    expectedOutput: "may_qualify"
  },
  {
    id: 20,
    name: "Excess Liquid Wealth with Low Earned Income",
    profile: "Single, $400/mo income, $85,000 inherited savings.",
    targetPrograms: ["SNAP"],
    expectedOutput: "unlikely"
  }
];