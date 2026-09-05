import { Box, LinearProgress, Typography } from "@mui/material";

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
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          pb: 1.5,
          borderBottom: "1px solid rgba(148,163,184,0.08)",
        }}
      >
        <Box minWidth={0}>
          <Typography variant="h6" fontWeight={800} lineHeight={1.15}>
            Requests by tower
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.35}>
            Request volume across business towers
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" fontWeight={800} sx={{ whiteSpace: "nowrap", pt: 0.1 }}>
          {total} requests
        </Typography>
      </Box>

      <Box sx={{ mt: 1.6, display: "grid", gap: 1.55 }}>
        {entries.map(([tower, count]) => {
          const meta = towerMeta[tower] ?? { label: tower, color: "#4F8CFF" };
          const percentage = total ? Math.round((count / total) * 100) : 0;

          return (
            <Box key={tower} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "10px minmax(0,1fr) 70px",
                  columnGap: 1,
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: meta.color, justifySelf: "center" }} />
                <Box minWidth={0}>
                  <Typography variant="body2" fontWeight={800} lineHeight={1.15} noWrap>
                    {tower}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" lineHeight={1.2} display="block" noWrap mt={0.28}>
                    {meta.label}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={800} textAlign="right" sx={{ whiteSpace: "nowrap" }}>
                  {count} · {percentage}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={(count / max) * 100}
                sx={{
                  mt: 0.7,
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
      </Box>
    </Box>
  );
}
