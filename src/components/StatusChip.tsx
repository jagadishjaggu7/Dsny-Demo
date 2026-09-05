import Chip from "@mui/material/Chip";
import type { TicketStatus } from "../types/ticket";

const statusStyles: Record<
  TicketStatus,
  { color: "default" | "primary" | "secondary" | "success" | "warning" | "info"; variant: "filled" | "outlined" }
> = {
  New: { color: "info", variant: "outlined" },
  Assigned: { color: "secondary", variant: "outlined" },
  DEV: { color: "warning", variant: "filled" },
  QA: { color: "info", variant: "filled" },
  PRD: { color: "primary", variant: "filled" },
  Closed: { color: "success", variant: "filled" },
};

interface StatusChipProps {
  status: TicketStatus;
}

export default function StatusChip({ status }: StatusChipProps) {
  const style = statusStyles[status];

  return (
    <Chip
      label={status}
      size="small"
      color={style.color}
      variant={style.variant}
      sx={{ fontWeight: 700, minWidth: status === "Assigned" ? 78 : 62 }}
    />
  );
}
