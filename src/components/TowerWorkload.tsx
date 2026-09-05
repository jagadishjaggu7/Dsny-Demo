import { Box, LinearProgress, Stack, Typography } from "@mui/material";

interface TowerWorkloadProps {
  data: Record<string, number>;
}

const towerMeta: Record<string, { label: string; color: string }> = {
  PTP: { label: "Procure to Pay", color: "#4F8CFF" },
  RTR: { label: "Record to Report", color: "#A78BFA" },
  DFS: { label: "Disney Financial Services", color: "#22D3EE" },
};

export default function TowerWorkload({ data }: TowerWorkloadProps) {
  const entries = Object.entries(data);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  const max = Math.max(...entries.map(([, value]) => value), 1);

  return (
    <Box sx={{ minWidth: 0 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.75}>
        <Box minWidth={0}>
          <Typography variant="h6" fontWeight={800}>Requests by tower</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.3}>
            Request volume across business towers
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" fontWeight={800} sx={{ whiteSpace: "nowrap" }}>
          {total} requests
        </Typography>
      </Stack>

      <Stack spacing={1.75}>
        {entries.map(([tower, count]) => {
          const meta = towerMeta[tower] ?? { label: tower, color: "#4F8CFF" };
          const percentage = total ? Math.round((count / total) * 100) : 0;

          return (
            <Box key={tower}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto auto",
                  columnGap: 1.25,
                  alignItems: "baseline",
                  mb: 0.7,
                }}
              >
                <Stack direction="row" spacing={0.9} alignItems="center" minWidth={0}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: meta.color, flexShrink: 0 }} />
                  <Box minWidth={0}>
                    <Typography variant="body2" fontWeight={800} lineHeight={1.2} noWrap>{tower}</Typography>
                    <Typography variant="caption" color="text.secondary" lineHeight={1.2} noWrap>{meta.label}</Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" fontWeight={800} textAlign="right">{count}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ minWidth: 36, textAlign: "right" }}>
                  {percentage}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={(count / max) * 100}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: "rgba(148,163,184,0.10)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${meta.color}, ${meta.color}B8)`,
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
