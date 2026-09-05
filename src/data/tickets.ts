import type { Ticket } from "../types/ticket";

export const tickets: Ticket[] = [
  {
    id: "CR-2026-0142",
    title: "Vendor Payment KPI Enhancement",
    tower: "RTR",
    priority: "High",
    status: "DEV",
    requester: "disney.user@disney.com",
    eta: "12 Sep 2026",
  },
  {
    id: "CR-2026-0141",
    title: "Invoice Dashboard Data Correction",
    tower: "PTP",
    priority: "Medium",
    status: "QA",
    requester: "cap.user@capgemini.com",
    eta: "10 Sep 2026",
  },
  {
    id: "CR-2026-0140",
    title: "Weekly Cash Flow Report Update",
    tower: "DFS",
    priority: "Critical",
    status: "Assigned",
    requester: "disney.finance@disney.com",
    eta: "15 Sep 2026",
  },
  {
    id: "CR-2026-0139",
    title: "Supplier Ageing Logic Change",
    tower: "PTP",
    priority: "Low",
    status: "Closed",
    requester: "cap.user@capgemini.com",
    eta: "05 Sep 2026",
  },
];
