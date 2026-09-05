import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { tickets } from "../data/tickets";
import StatusChip from "../components/StatusChip";

const requesterEmail = "disney.user@disney.com";

export default function MyRequests() {
  const myRequests = tickets.filter((ticket) => ticket.requester === requesterEmail);

  return (
    <Box sx={{ maxWidth: 1120, mx: "auto", pb: 5 }}>
      <Box sx={{ mb: 2.5, p: { xs: 2, md: 2.5 }, borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", border: "1px solid rgba(96,165,250,0.16)" }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box sx={{ width: 40, height: 40, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: "rgba(79,140,255,0.10)", color: "primary.main" }}><AssignmentOutlinedIcon /></Box>
          <Box>
            <Typography variant="caption" sx={{ color: "#93C5FD", fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase" }}>Requester workspace</Typography>
            <Typography component="h1" sx={{ fontSize: { xs: "1.9rem", md: "2.35rem" }, fontWeight: 900, lineHeight: 1.05 }}>My Requests</Typography>
          </Box>
        </Stack>
        <Typography color="text.secondary" mt={1}>Track the requests you have raised and see their current status.</Typography>
      </Box>

      <Stack spacing={1.5}>
        {myRequests.map((ticket) => (
          <Paper key={ticket.id} elevation={0} sx={{ p: 2.2, borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", border: "1px solid rgba(148,163,184,0.12)" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={800}>{ticket.id} · {ticket.requestType}</Typography>
                <Typography fontWeight={800} mt={0.4}>{ticket.title}</Typography>
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" useFlexGap>
                  <Chip size="small" label={ticket.tower} variant="outlined" />
                  <Chip size="small" label={ticket.priority} variant="outlined" />
                </Stack>
              </Box>
              <StatusChip status={ticket.status} />
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
