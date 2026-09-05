import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { tickets } from "../data/tickets";
import StatusChip from "../components/StatusChip";

const requesterEmail = "disney.user@disney.com";

interface MyRequestsProps {
  onNewRequest: () => void;
}

export default function MyRequests({ onNewRequest }: MyRequestsProps) {
  const myRequests = tickets.filter((ticket) => ticket.requester === requesterEmail);
  const closedCount = myRequests.filter((ticket) => ticket.status === "Closed").length;
  const openCount = myRequests.length - closedCount;

  return (
    <Box sx={{ maxWidth: 1120, mx: "auto", pb: 5 }}>
      <Box
        sx={{
          mb: 2,
          p: { xs: 2.25, md: 2.75 },
          borderRadius: 3,
          background: "linear-gradient(135deg, rgba(17,24,39,0.98), rgba(13,24,48,0.92))",
          border: "1px solid rgba(96,165,250,0.18)",
          boxShadow: "0 18px 45px rgba(0,0,0,0.16)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
          <Stack direction="row" spacing={1.4} alignItems="center">
            <Box sx={{ width: 44, height: 44, borderRadius: 2.2, display: "grid", placeItems: "center", bgcolor: "rgba(79,140,255,0.12)", color: "primary.main", border: "1px solid rgba(96,165,250,0.16)" }}>
              <AssignmentOutlinedIcon />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "#93C5FD", fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase" }}>
                Requester workspace
              </Typography>
              <Typography component="h1" sx={{ fontSize: { xs: "1.9rem", md: "2.25rem" }, fontWeight: 900, lineHeight: 1.05 }}>
                My Requests
              </Typography>
            </Box>
          </Stack>
          <Button variant="contained" startIcon={<AddOutlinedIcon />} onClick={onNewRequest} sx={{ borderRadius: 2, whiteSpace: "nowrap" }}>
            New Request
          </Button>
        </Stack>
        <Typography color="text.secondary" mt={1.2} sx={{ maxWidth: 720 }}>
          Track requests you raised, see where they are in the delivery process, and review the latest ETA.
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 2.25 }}>
        <Paper elevation={0} sx={{ flex: 1, p: 1.7, borderRadius: 2.5, bgcolor: "rgba(17,24,39,0.78)", border: "1px solid rgba(148,163,184,0.12)" }}>
          <Typography variant="caption" color="text.secondary">Total requests</Typography>
          <Typography variant="h5" fontWeight={900}>{myRequests.length}</Typography>
        </Paper>
        <Paper elevation={0} sx={{ flex: 1, p: 1.7, borderRadius: 2.5, bgcolor: "rgba(17,24,39,0.78)", border: "1px solid rgba(148,163,184,0.12)" }}>
          <Typography variant="caption" color="text.secondary">In progress</Typography>
          <Typography variant="h5" fontWeight={900}>{openCount}</Typography>
        </Paper>
        <Paper elevation={0} sx={{ flex: 1, p: 1.7, borderRadius: 2.5, bgcolor: "rgba(17,24,39,0.78)", border: "1px solid rgba(148,163,184,0.12)" }}>
          <Typography variant="caption" color="text.secondary">Completed</Typography>
          <Typography variant="h5" fontWeight={900}>{closedCount}</Typography>
        </Paper>
      </Stack>

      <Stack spacing={1.5}>
        {myRequests.map((ticket) => (
          <Paper
            key={ticket.id}
            elevation={0}
            sx={{
              p: { xs: 2, md: 2.2 },
              borderRadius: 3,
              bgcolor: "rgba(17,24,39,0.82)",
              border: "1px solid rgba(148,163,184,0.12)",
              transition: "border-color 0.2s ease, transform 0.2s ease",
              "&:hover": { borderColor: "rgba(96,165,250,0.28)", transform: "translateY(-1px)" },
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  <Typography variant="caption" sx={{ color: "#93C5FD", fontWeight: 800 }}>{ticket.id}</Typography>
                  <Chip size="small" label={ticket.requestType} variant="outlined" sx={{ height: 24, fontSize: "0.72rem" }} />
                </Stack>
                <Typography fontWeight={800} fontSize="1.02rem" mt={0.8}>{ticket.title}</Typography>

                <Stack direction="row" spacing={1} mt={1.15} flexWrap="wrap" useFlexGap>
                  <Chip size="small" label={ticket.tower} variant="outlined" />
                  <Chip size="small" label={`${ticket.priority} priority`} variant="outlined" />
                  {ticket.reportName && <Chip size="small" label={ticket.reportName} variant="outlined" />}
                  {ticket.reportingMonth && <Chip size="small" label={ticket.reportingMonth} variant="outlined" />}
                </Stack>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

              <Stack spacing={0.75} sx={{ minWidth: { md: 160 }, alignItems: { xs: "flex-start", md: "flex-end" } }}>
                <StatusChip status={ticket.status} />
                <Stack direction="row" spacing={0.7} alignItems="center" color="text.secondary">
                  {ticket.status === "Closed" ? <TaskAltOutlinedIcon sx={{ fontSize: 16 }} /> : <ScheduleOutlinedIcon sx={{ fontSize: 16 }} />}
                  <Typography variant="caption">{ticket.status === "Closed" ? "Completed" : `ETA ${ticket.eta ?? "TBD"}`}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {myRequests.length === 0 && (
        <Paper elevation={0} sx={{ p: 5, textAlign: "center", borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", border: "1px dashed rgba(148,163,184,0.2)" }}>
          <Typography fontWeight={800}>No requests yet</Typography>
          <Typography color="text.secondary" mt={0.5}>Your submitted change and reporting/data requests will appear here.</Typography>
        </Paper>
      )}
    </Box>
  );
}
