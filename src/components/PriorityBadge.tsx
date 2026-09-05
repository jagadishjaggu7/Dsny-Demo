import Chip from "@mui/material/Chip";
import type { TicketPriority } from "../types/ticket";

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const isHigh = priority === "High" || priority === "Critical";

  return (
    <Chip
      label={priority}
      size="small"
      variant={isHigh ? "filled" : "outlined"}
      color={
        priority === "Critical"
          ? "error"
          : priority === "High"
            ? "warning"
            : priority === "Medium"
              ? "info"
              : "default"
      }
      sx={{ fontWeight: 700, minWidth: priority === "Critical" ? 76 : 66 }}
    />
  );
}
