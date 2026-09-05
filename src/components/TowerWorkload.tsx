import { Box, LinearProgress, Stack, Typography } from "@mui/material";

interface TowerWorkloadProps {
  data: Record<string, number>;
}

export default function TowerWorkload({ data }: TowerWorkloadProps) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, value]) => value), 1);

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" fontWeight={800}>
          Workload by Tower
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tickets represented in the current feed
        </Typography>
      </Box>

      <Stack spacing={2.1}>
        {entries.map(([tower, count]) => (
          <Box key={tower}>
            <Stack direction="row" justifyContent="space-between" mb={0.6}>
              <Typography variant="body2" fontWeight={700}>
                {tower}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {count} tickets
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={(count / max) * 100}
              sx={{
                height: 9,
                borderRadius: 999,
                bgcolor: "rgba(148,163,184,0.12)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  backgroundColor: "#4F8CFF",
                },
              }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
