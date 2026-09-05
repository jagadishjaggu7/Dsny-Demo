import { Box, Chip, Stack, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TicketStatus } from "../types/ticket";

interface StatusSplitProps {
  data: Record<TicketStatus, number>;
}

const statuses: TicketStatus[] = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];

const colors: Record<TicketStatus, string> = {
  New: "#60A5FA",
  Assigned: "#A78BFA",
  DEV: "#F59E0B",
  QA: "#22D3EE",
  PRD: "#3B82F6",
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
          <Typography variant="body2" color="text.secondary" mt={0.25}>How requests are moving through the workflow</Typography>
        </Box>
        <Chip label={`${total} requests`} size="small" sx={{ fontWeight: 700, bgcolor: "rgba(255,255,255,0.05)" }} />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2.5} alignItems="center">
        <Box sx={{ width: { xs: "100%", md: 250 }, height: 230, position: "relative", flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={66} outerRadius={94} paddingAngle={3} stroke="none">
                {chartData.map((entry) => <Cell key={entry.name} fill={colors[entry.name as TicketStatus]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#101827", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 10, color: "#F8FAFC" }}
                formatter={(value, _name, item) => [`${value} · ${total ? Math.round((Number(value) / total) * 100) : 0}%`, item?.payload?.name ?? "Status"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <Stack position="absolute" inset={0} alignItems="center" justifyContent="center" pointerEvents="none">
            <Typography sx={{ fontSize: "1.75rem", fontWeight: 850, lineHeight: 1 }}>{total}</Typography>
            <Typography variant="caption" color="text.secondary">total requests</Typography>
          </Stack>
        </Box>

        <Box flex={1} width="100%">
          <Stack spacing={0.7}>
            {statuses.map((status) => {
              const count = data[status];
              const percent = total ? Math.round((count / total) * 100) : 0;
              return (
                <Stack key={status} direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.7, px: 1, borderRadius: 1.75, "&:hover": { bgcolor: "rgba(255,255,255,0.035)" } }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: colors[status] }} />
                    <Typography variant="body2" fontWeight={700}>{status}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.25} alignItems="baseline">
                    <Typography variant="body2" fontWeight={800}>{count}</Typography>
                    <Typography variant="caption" color="text.secondary" minWidth={32} textAlign="right">{percent}%</Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
