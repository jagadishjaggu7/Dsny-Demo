import type { RequestType, Ticket } from "../types/ticket";
import { towers } from "../data/towers";

export function getTowerName(code: Ticket["tower"]): string {
  return towers.find((tower) => tower.code === code)?.name ?? code;
}

export function getTicketDisplayTitle(ticket: Ticket): string {
  return `${getTowerName(ticket.tower)} — ${ticket.title}`;
}

export function getRequestTypeLabel(type: RequestType): string {
  return type === "Change Request" ? "Change Request" : "Data Quality Issue";
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
  return parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replaceAll(" ", " ");
}
