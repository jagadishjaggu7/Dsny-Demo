import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import type { Ticket } from "../types/ticket";
import StatusChip from "../components/StatusChip";
import PriorityBadge from "../components/PriorityBadge";
import type { AppRole } from "../components/Sidebar";

interface TicketDetailProps {
  ticket: Ticket;
  role: AppRole;
  onBack: () => void;
}

const workflow = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"] as const;

export default function TicketDetail({ ticket, role, onBack }: TicketDetailProps) {
  const currentIndex = workflow.indexOf(ticket.status);

  return (
    <Box sx={{ maxWidth: 1120, mx: "auto", pb: 5 }}>
      <Button onClick={onBack} startIcon={<ArrowBackOutlinedIcon />} sx={{ mb: 1.5, px: 0.5 }}>
        Back to {role === "admin" ? "All Requests" : "My Requests"}
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.25, md: 3 },
          borderRadius: 3,
          bgcolor: "rgba(17,24,39,0.9)",
          border: "1px solid rgba(96,165,250,0.18)",
          boxShadow: "0 18px 45px rgba(0,0,0,0.16)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
          <Box sx={{ minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Typography variant="caption" sx={{ color: "#93C5FD", fontWeight: 900 }}>{ticket.id}</Typography>
              <Chip size="small" label={ticket.requestType} variant="outlined" />
            </Stack>
            <Typography component="h1" sx={{ mt: 0.8, fontSize: { xs: "1.65rem", md: "2.15rem" }, lineHeight: 1.1, fontWeight: 900 }}>
              {ticket.title}
            </Typography>
          </Box>
          <Stack spacing={0.75} alignItems={{ xs: "flex-start", md: "flex-end" }}>
            <StatusChip status={ticket.status} />
            <Typography variant="caption" color="text.secondary">
              {ticket.status === "Closed" ? "Completed" : `ETA ${ticket.eta ?? "TBD"}`}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack spacing={2.25}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap" useFlexGap>
            <Paper elevation={0} sx={{ p: 1.5, minWidth: 180, flex: 1, bgcolor: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}>
              <Stack direction="row" spacing={1} alignItems="center"><DashboardOutlinedIcon fontSize="small" color="primary" /><Typography variant="caption" color="text.secondary">Tower</Typography></Stack>
              <Typography fontWeight={800} mt={0.55}>{ticket.tower}</Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 1.5, minWidth: 180, flex: 1, bgcolor: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}>
              <Stack direction="row" spacing={1} alignItems="center"><FlagOutlinedIcon fontSize="small" color="primary" /><Typography variant="caption" color="text.secondary">Priority</Typography></Stack>
              <Box sx={{ mt: 0.5 }}><PriorityBadge priority={ticket.priority} /></Box>
            </Paper>
            <Paper elevation={0} sx={{ p: 1.5, minWidth: 220, flex: 1, bgcolor: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}>
              <Stack direction="row" spacing={1} alignItems="center"><PersonOutlineOutlinedIcon fontSize="small" color="primary" /><Typography variant="caption" color="text.secondary">Requester</Typography></Stack>
              <Typography fontWeight={800} mt={0.55} sx={{ wordBreak: "break-word" }}>{ticket.requester}</Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 1.5, minWidth: 180, flex: 1, bgcolor: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}>
              <Stack direction="row" spacing={1} alignItems="center"><CalendarTodayOutlinedIcon fontSize="small" color="primary" /><Typography variant="caption" color="text.secondary">ETA</Typography></Stack>
              <Typography fontWeight={800} mt={0.55}>{ticket.status === "Closed" ? "Completed" : ticket.eta ?? "TBD"}</Typography>
            </Paper>
          </Stack>

          {(ticket.reportName || ticket.reportingMonth) && (
            <Box>
              <Typography variant="subtitle1" fontWeight={800} mb={1}>Reporting / Data Issue Details</Typography>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "rgba(15,23,42,0.6)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  {ticket.reportName && <Box><Typography variant="caption" color="text.secondary">Report / Dashboard</Typography><Typography fontWeight={700}>{ticket.reportName}</Typography></Box>}
                  {ticket.reportingMonth && <Box><Typography variant="caption" color="text.secondary">Reporting Month</Typography><Typography fontWeight={700}>{ticket.reportingMonth}</Typography></Box>}
                </Stack>
              </Paper>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle1" fontWeight={800} mb={1}>Workflow Status</Typography>
            <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
              {workflow.map((status, index) => (
                <Chip
                  key={status}
                  label={status}
                  size="small"
                  color={index === currentIndex ? "primary" : index < currentIndex ? "success" : "default"}
                  variant={index <= currentIndex ? "filled" : "outlined"}
                  sx={{ fontWeight: 800 }}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ p: 1.7, borderRadius: 2.5, bgcolor: role === "admin" ? "rgba(79,140,255,0.06)" : "rgba(148,163,184,0.05)", border: "1px solid rgba(148,163,184,0.10)" }}>
            <Stack direction="row" spacing={1.2} alignItems="flex-start">
              <AssignmentOutlinedIcon sx={{ mt: 0.15, color: "#93C5FD" }} />
              <Box>
                <Typography fontWeight={800}>{role === "admin" ? "Administrator view" : "Requester view"}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.35}>
                  {role === "admin"
                    ? "Review the complete request record and workflow status. Editing and assignment actions can be connected to the backend later."
                    : "You can review the request details and track its workflow status. Administrative actions are not available in this view."}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
