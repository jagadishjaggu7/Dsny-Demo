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
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography variant="h6" fontWeight={800}>Tower workload</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.3}>
            Current request distribution
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" fontWeight={800}>
          {total} total
        </Typography>
      </Stack>

      <Stack spacing={2.25}>
        {entries.map(([tower, count]) => {
          const meta = towerMeta[tower] ?? { label: tower, color: "#4F8CFF" };
          const percentage = total ? Math.round((count / total) * 100) : 0;

          return (
            <Box key={tower}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.7}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: meta.color }} />
                  <Box>
                    <Typography variant="body2" fontWeight={800}>{tower}</Typography>
                    <Typography variant="caption" color="text.secondary">{meta.label}</Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" fontWeight={800}>{count}</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(count / max) * 100}
                sx={{
                  height: 9,
                  borderRadius: 999,
                  bgcolor: "rgba(148,163,184,0.10)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${meta.color}, ${meta.color}B8)`,
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary" display="block" mt={0.45}>
                {percentage}% of all current requests
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
