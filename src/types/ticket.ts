export type TicketStatus =
  | "New"
  | "Assigned"
  | "DEV"
  | "QA"
  | "PRD"
  | "Closed";

export type TicketPriority = "Low" | "Medium" | "High" | "Critical";

export interface Ticket {
  id: string;
  title: string;
  tower: "PTP" | "RTR" | "DFS";
  priority: TicketPriority;
  status: TicketStatus;
  requester: string;
  eta?: string;
}
