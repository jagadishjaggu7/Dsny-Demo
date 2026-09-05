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
  const open = statuses.filter((status) => status !== "Closed").reduce((sum, status) => sum + data[status], 0);
  const chartData = statuses.map((status) => ({ name: status, value: data[status] }));

  return (
    <Box sx={{ minWidth: 0 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Box minWidth={0}>
          <Typography variant="h6" fontWeight={800}>Requests by status</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.25}>Current workflow distribution</Typography>
        </Box>
        <Chip label={`${total} requests`} size="small" sx={{ fontWeight: 700, bgcolor: "rgba(255,255,255,0.05)" }} />
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "220px minmax(0,1fr)" }, gap: { xs: 1.5, md: 2.5 }, alignItems: "center" }}>
        <Box sx={{ height: 208, position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={3} stroke="none">
                {chartData.map((entry) => <Cell key={entry.name} fill={colors[entry.name as TicketStatus]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#101827", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 10, color: "#F8FAFC" }}
                formatter={(value, _name, item) => [`${value} · ${total ? Math.round((Number(value) / total) * 100) : 0}%`, item?.payload?.name ?? "Status"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <Stack position="absolute" inset={0} alignItems="center" justifyContent="center" pointerEvents="none">
            <Typography sx={{ fontSize: "1.7rem", fontWeight: 850, lineHeight: 1 }}>{open}</Typography>
            <Typography variant="caption" color="text.secondary" mt={0.35}>open requests</Typography>
          </Stack>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 32px 48px", columnGap: 1.5, mb: 0.5, px: 1 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={800}>STATUS</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={800} textAlign="right">#</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={800} textAlign="right">SHARE</Typography>
          </Box>
          <Stack spacing={0.35}>
            {statuses.map((status) => {
              const count = data[status];
              const percent = total ? Math.round((count / total) * 100) : 0;
              return (
                <Box key={status} sx={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 32px 48px", columnGap: 1.5, alignItems: "center", minHeight: 32, px: 1, borderRadius: 1.5, "&:hover": { bgcolor: "rgba(255,255,255,0.035)" } }}>
                  <Stack direction="row" spacing={1} alignItems="center" minWidth={0}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: colors[status], flexShrink: 0 }} />
                    <Typography variant="body2" fontWeight={700} noWrap>{status}</Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={800} textAlign="right">{count}</Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={700} textAlign="right">{percent}%</Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
