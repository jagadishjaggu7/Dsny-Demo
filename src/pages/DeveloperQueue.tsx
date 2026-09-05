import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import type { Ticket } from "../types/ticket";
import StatusChip from "../components/StatusChip";

interface DeveloperQueueProps {
  tickets: Ticket[];
  developerId: string;
  onTicketClick: (ticket: Ticket) => void;
}

export default function DeveloperQueue({ tickets, developerId, onTicketClick }: DeveloperQueueProps) {
  const queue = tickets.filter((ticket) => ticket.assignedDeveloperId === developerId && ticket.status !== "Closed");
  const completed = tickets.filter((ticket) => ticket.assignedDeveloperId === developerId && ticket.status === "Closed").length;

  return (
    <Box sx={{ maxWidth: 1120, mx: "auto", pb: 5 }}>
      <Box sx={{ mb: 2.25, px: { xs: 2, md: 2.5 }, py: { xs: 1.8, md: 2.1 }, borderRadius: 3, background: "linear-gradient(135deg, rgba(17,24,39,0.98), rgba(13,24,48,0.92))", border: "1px solid rgba(96,165,250,0.18)" }}>
        <Stack direction="row" spacing={1.4} alignItems="center">
          <Box sx={{ width: 44, height: 44, borderRadius: 2.2, display: "grid", placeItems: "center", bgcolor: "rgba(79,140,255,0.12)", color: "primary.main", border: "1px solid rgba(96,165,250,0.16)" }}><CodeRoundedIcon /></Box>
          <Box><Typography component="h1" sx={{ fontSize: { xs: "1.9rem", md: "2.3rem" }, fontWeight: 900, lineHeight: 1.05, letterSpacing: -0.8 }}>My Queue</Typography><Typography color="text.secondary" sx={{ mt: 0.45 }}>Requests currently assigned to you.</Typography></Box>
        </Stack>
      </Box>
      <Stack direction="row" spacing={1.5} sx={{ mb: 2.25 }}>
        <Paper elevation={0} sx={{ flex: 1, p: 1.6, borderRadius: 2.5, bgcolor: "rgba(17,24,39,0.78)", border: "1px solid rgba(148,163,184,0.12)" }}><Typography variant="caption" color="text.secondary">Active assignments</Typography><Typography variant="h5" fontWeight={900}>{queue.length}</Typography></Paper>
        <Paper elevation={0} sx={{ flex: 1, p: 1.6, borderRadius: 2.5, bgcolor: "rgba(17,24,39,0.78)", border: "1px solid rgba(148,163,184,0.12)" }}><Typography variant="caption" color="text.secondary">Completed</Typography><Typography variant="h5" fontWeight={900}>{completed}</Typography></Paper>
      </Stack>
      <Stack spacing={1.5}>
        {queue.map((ticket) => (
          <Paper key={ticket.id} elevation={0} sx={{ p: { xs: 2, md: 2.2 }, borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", border: "1px solid rgba(148,163,184,0.12)", cursor: "pointer", transition: "border-color .2s ease, transform .2s ease", "&:hover": { borderColor: "rgba(96,165,250,0.3)", transform: "translateY(-1px)" } }} onClick={() => onTicketClick(ticket)}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }}>
              <Box sx={{ flex: 1, minWidth: 0 }}><Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap><Typography variant="caption" sx={{ color: "#93C5FD", fontWeight: 800 }}>{ticket.id}</Typography><Chip size="small" label={ticket.requestType === "Change Request" ? "Change" : "Data issue"} variant="outlined" /></Stack><Typography fontWeight={800} mt={0.65}>{ticket.title}</Typography><Stack direction="row" spacing={1} mt={0.95} flexWrap="wrap" useFlexGap><Chip size="small" label={ticket.tower} variant="outlined" /><Chip size="small" label={`${ticket.priority} priority`} variant="outlined" />{ticket.reportName && <Chip size="small" label={ticket.reportName} variant="outlined" />}</Stack></Box>
              <Stack spacing={0.65} alignItems={{ xs: "flex-start", md: "flex-end" }}><StatusChip status={ticket.status} /><Stack direction="row" spacing={0.6} alignItems="center" color="text.secondary"><ScheduleOutlinedIcon sx={{ fontSize: 16 }} /><Typography variant="caption">ETA {ticket.eta ?? "TBD"}</Typography></Stack></Stack>
              <ArrowForwardRoundedIcon sx={{ color: "text.secondary", display: { xs: "none", md: "block" } }} />
            </Stack>
          </Paper>
        ))}
      </Stack>
      {queue.length === 0 && <Paper elevation={0} sx={{ p: 5, textAlign: "center", borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", border: "1px dashed rgba(148,163,184,0.2)" }}><Typography fontWeight={800}>No active assignments</Typography><Typography color="text.secondary" mt={0.5}>Requests assigned to you will appear here.</Typography></Paper>}
    </Box>
  );
}
