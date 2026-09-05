import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import type { TicketStatus } from "../types/ticket";

interface StatusSplitProps {
  data: Record<TicketStatus, number>;
}

const statuses: TicketStatus[] = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];

const barColor: Record<TicketStatus, string> = {
  New: "#38BDF8",
  Assigned: "#A78BFA",
  DEV: "#F59E0B",
  QA: "#22D3EE",
  PRD: "#4F8CFF",
  Closed: "#22C55E",
};

export default function StatusSplit({ data }: StatusSplitProps) {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2.25}>
        <Box>
          <Typography variant="h6" fontWeight={800}>
            Status distribution
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.25}>
            Current requests by workflow stage
          </Typography>
        </Box>
        <Chip label={`${total} total`} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
      </Stack>

      <Stack spacing={1.45}>
        {statuses.map((status) => {
          const count = data[status];
          const percent = total ? (count / total) * 100 : 0;

          return (
            <Box key={status}>
              <Stack direction="row" justifyContent="space-between" alignItems="baseline" mb={0.6}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: barColor[status] }} />
                  <Typography variant="body2" fontWeight={700}>{status}</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {count} · {Math.round(percent)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: "rgba(148,163,184,0.10)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    backgroundColor: barColor[status],
                  },
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
