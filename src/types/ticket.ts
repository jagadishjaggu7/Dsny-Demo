export type TicketStatus =
  | "New"
  | "Assigned"
  | "DEV"
  | "QA"
  | "PRD"
  | "Closed";

export type TicketPriority = "Low" | "Medium" | "High" | "Critical";

export type RequestType = "Change Request" | "Reporting / Data Issue";

export interface Ticket {
  id: string;
  requestType: RequestType;
  title: string;
  description?: string;
  tower: "PTP" | "RTR" | "DFS";
  deliveryCentre?: string;
  subprocess?: string;
  priority: TicketPriority;
  status: TicketStatus;
  requester: string;
  assignedDeveloperId?: string;
  assignedDeveloperName?: string;
  eta?: string;
  reportName?: string;
  reportingMonth?: string;
}
