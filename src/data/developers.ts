export interface Developer {
  id: string;
  name: string;
  email: string;
  tower: "PTP" | "RTR" | "DFS" | "All";
}

export const developers: Developer[] = [
  { id: "dev-001", name: "Alex Johnson", email: "alex.johnson@capgemini.com", tower: "PTP" },
  { id: "dev-002", name: "Priya Sharma", email: "priya.sharma@capgemini.com", tower: "RTR" },
  { id: "dev-003", name: "Daniel Lee", email: "daniel.lee@capgemini.com", tower: "DFS" },
  { id: "dev-004", name: "Maya Patel", email: "maya.patel@capgemini.com", tower: "All" },
];

export const currentDeveloperId = "dev-002";
