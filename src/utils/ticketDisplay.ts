import type { RequestType, Ticket } from "../types/ticket";

export function getRequestTypeLabel(type: RequestType): string {
  return type === "Change Request" ? "Change Request" : "Data Quality Issue";
}

export function getTicketDisplayTitle(ticket: Ticket): string {
  return ticket.title;
}

export function getEtaInputValue(eta?: string): string {
  if (!eta) return "";
  const parsed = new Date(eta);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}

export function formatEta(inputValue: string): string | undefined {
  if (!inputValue) return undefined;
  const parsed = new Date(`${inputValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
