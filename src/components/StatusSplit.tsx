import { Box, Chip, Stack, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TicketStatus } from "../types/ticket";

interface StatusSplitProps {
  data: Record<TicketStatus, number>;
}

const statuses: TicketStatus[] = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];

const colors: Record<TicketStatus, string> = {
  New: "#38BDF8",
  Assigned: "#A78BFA",
  DEV: "#F59E0B",
  QA: "#22D3EE",
  PRD: "#4F8CFF",
  Closed: "#22C55E",
};

export default function StatusSplit({ data }: StatusSplitProps) {
  const total = statuses.reduce((sum, status) => sum + data[status], 0);
  const chartData = statuses.map((status) => ({ name: status, value: data[status] }));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
        <Box>
          <Typography variant="h6" fontWeight={800}>Status distribution</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.25}>Current requests by workflow stage</Typography>
        </Box>
        <Chip label={`${total} total`} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
        <Box sx={{ width: { xs: "100%", sm: 220 }, height: 220, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={2} stroke="none">
                {chartData.map((entry) => <Cell key={entry.name} fill={colors[entry.name as TicketStatus]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 10, color: "#F8FAFC" }}
                formatter={(value, _name, item) => [`${value} (${total ? Math.round((Number(value) / total) * 100) : 0}%)`, item?.payload?.name ?? "Status"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box flex={1} width="100%">
          <Stack spacing={0.85}>
            {statuses.map((status) => {
              const count = data[status];
              const percent = total ? Math.round((count / total) * 100) : 0;
              return (
                <Stack key={status} direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.55 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: colors[status], boxShadow: `0 0 0 3px ${colors[status]}18` }} />
                    <Typography variant="body2" fontWeight={700}>{status}</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>{count} · {percent}%</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
