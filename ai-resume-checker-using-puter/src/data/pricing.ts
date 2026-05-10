import type { Plan } from "../types/pricing";

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹299",
    credits: 5,
    features: ["5 Resume Analyses", "ATS Score Reports", "AI Suggestions"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹799",
    credits: 10,
    popular: true,
    features: [
      "10 Resume Analyses",
      "Priority AI Processing",
      "Advanced Optimization",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹1499",
    credits: 20,
    features: [
      "20 Resume Analyses",
      "Fastest Processing",
      "Premium Insights & Reports",
    ],
  },
];
