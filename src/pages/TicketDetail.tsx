import { useState } from "react";
import { Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import type { Ticket, TicketPriority, TicketStatus } from "../types/ticket";
import StatusChip from "../components/StatusChip";
import PriorityBadge from "../components/PriorityBadge";
import type { AppRole } from "../components/Sidebar";
import { developers } from "../data/developers";

interface TicketDetailProps { ticket: Ticket; role: AppRole; onBack: () => void; onUpdate: (ticket: Ticket) => void; }
const workflow: TicketStatus[] = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];

export default function TicketDetail({ ticket, role, onBack, onUpdate }: TicketDetailProps) {
  const [draft, setDraft] = useState(ticket);
  const currentIndex = workflow.indexOf(draft.status);
  const update = (patch: Partial<Ticket>) => { const next = { ...draft, ...patch }; setDraft(next); onUpdate(next); };
  const assignedDeveloper = developers.find((dev) => dev.id === draft.assignedDeveloperId);

  return (
    <Box sx={{ maxWidth: 1120, mx: "auto", pb: 5 }}>
      <Button onClick={onBack} startIcon={<ArrowBackOutlinedIcon />} sx={{ mb: 1.5, px: 0.5 }}>Back to {role === "admin" ? "All Requests" : role === "developer" ? "My Queue" : "My Requests"}</Button>
      <Paper elevation={0} sx={{ p: { xs: 2.25, md: 3 }, borderRadius: 3, bgcolor: "rgba(17,24,39,0.9)", border: "1px solid rgba(96,165,250,0.18)", boxShadow: "0 18px 45px rgba(0,0,0,0.16)" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
          <Box sx={{ minWidth: 0 }}><Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap><Typography variant="caption" sx={{ color: "#93C5FD", fontWeight: 900 }}>{draft.id}</Typography><Chip size="small" label={draft.requestType} variant="outlined" /></Stack><Typography component="h1" sx={{ mt: 0.8, fontSize: { xs: "1.65rem", md: "2.15rem" }, lineHeight: 1.1, fontWeight: 900 }}>{draft.title}</Typography></Box>
          <Stack spacing={0.75} alignItems={{ xs: "flex-start", md: "flex-end" }}><StatusChip status={draft.status} /><Typography variant="caption" color="text.secondary">{draft.status === "Closed" ? "Completed" : `ETA ${draft.eta ?? "TBD"}`}</Typography></Stack>
        </Stack>
        <Divider sx={{ my: 2.5 }} />
        <Stack spacing={2.25}>
          {draft.description && <Box><Typography variant="subtitle1" fontWeight={800} mb={0.8}>Description</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{draft.description}</Typography></Box>}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap" useFlexGap>
            <Paper elevation={0} sx={{ p: 1.5, minWidth: 180, flex: 1, bgcolor: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}><Stack direction="row" spacing={1} alignItems="center"><DashboardOutlinedIcon fontSize="small" color="primary" /><Typography variant="caption" color="text.secondary">Tower</Typography></Stack><Typography fontWeight={800} mt={0.55}>{draft.tower}</Typography></Paper>
            <Paper elevation={0} sx={{ p: 1.5, minWidth: 180, flex: 1, bgcolor: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}><Stack direction="row" spacing={1} alignItems="center"><FlagOutlinedIcon fontSize="small" color="primary" /><Typography variant="caption" color="text.secondary">Priority</Typography></Stack><Box sx={{ mt: 0.5 }}><PriorityBadge priority={draft.priority} /></Box></Paper>
            <Paper elevation={0} sx={{ p: 1.5, minWidth: 220, flex: 1, bgcolor: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}><Stack direction="row" spacing={1} alignItems="center"><PersonOutlineOutlinedIcon fontSize="small" color="primary" /><Typography variant="caption" color="text.secondary">Requester</Typography></Stack><Typography fontWeight={800} mt={0.55} sx={{ wordBreak: "break-word" }}>{draft.requester}</Typography></Paper>
            <Paper elevation={0} sx={{ p: 1.5, minWidth: 180, flex: 1, bgcolor: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}><Stack direction="row" spacing={1} alignItems="center"><CalendarTodayOutlinedIcon fontSize="small" color="primary" /><Typography variant="caption" color="text.secondary">ETA</Typography></Stack><Typography fontWeight={800} mt={0.55}>{draft.status === "Closed" ? "Completed" : draft.eta ?? "TBD"}</Typography></Paper>
          </Stack>

          {role === "admin" && <Paper elevation={0} sx={{ p: 2, bgcolor: "rgba(79,140,255,0.055)", border: "1px solid rgba(96,165,250,0.16)", borderRadius: 2.5 }}><Typography variant="subtitle1" fontWeight={800} mb={1.5}>Administration</Typography><Stack direction={{ xs: "column", md: "row" }} spacing={2}><FormControl fullWidth size="small"><InputLabel id="developer-label">Assigned developer</InputLabel><Select labelId="developer-label" label="Assigned developer" value={draft.assignedDeveloperId ?? ""} onChange={(event) => { const id = event.target.value; const dev = developers.find((item) => item.id === id); update({ assignedDeveloperId: id || undefined, assignedDeveloperName: dev?.name }); }}><MenuItem value="">Unassigned</MenuItem>{developers.map((dev) => <MenuItem key={dev.id} value={dev.id}>{dev.name} · {dev.tower}</MenuItem>)}</Select></FormControl><FormControl fullWidth size="small"><InputLabel id="status-label">Status</InputLabel><Select labelId="status-label" label="Status" value={draft.status} onChange={(event) => update({ status: event.target.value as TicketStatus })}>{workflow.map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}</Select></FormControl><FormControl fullWidth size="small"><InputLabel id="priority-label">Priority</InputLabel><Select labelId="priority-label" label="Priority" value={draft.priority} onChange={(event) => update({ priority: event.target.value as TicketPriority })}>{["Low", "Medium", "High", "Critical"].map((priority) => <MenuItem key={priority} value={priority}>{priority}</MenuItem>)}</Select></FormControl></Stack>{assignedDeveloper && <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.25 }}>Internal assignment: {assignedDeveloper.name}</Typography>}</Paper>}

          {role !== "requester" && (draft.reportName || draft.reportingMonth) && <Box><Typography variant="subtitle1" fontWeight={800} mb={1}>Reporting / Data Issue Details</Typography><Paper elevation={0} sx={{ p: 2, bgcolor: "rgba(15,23,42,0.6)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}><Stack direction={{ xs: "column", sm: "row" }} spacing={3}>{draft.reportName && <Box><Typography variant="caption" color="text.secondary">Report / Dashboard</Typography><Typography fontWeight={700}>{draft.reportName}</Typography></Box>}{draft.reportingMonth && <Box><Typography variant="caption" color="text.secondary">Reporting Month</Typography><Typography fontWeight={700}>{draft.reportingMonth}</Typography></Box>}</Stack></Paper></Box>}
          {role === "requester" && (draft.reportName || draft.reportingMonth) && <Box><Typography variant="subtitle1" fontWeight={800} mb={1}>Report Details</Typography><Paper elevation={0} sx={{ p: 2, bgcolor: "rgba(15,23,42,0.6)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 2.5 }}><Stack direction={{ xs: "column", sm: "row" }} spacing={3}>{draft.reportName && <Box><Typography variant="caption" color="text.secondary">Report / Dashboard</Typography><Typography fontWeight={700}>{draft.reportName}</Typography></Box>}{draft.reportingMonth && <Box><Typography variant="caption" color="text.secondary">Reporting Month</Typography><Typography fontWeight={700}>{draft.reportingMonth}</Typography></Box>}</Stack></Paper></Box>}
          <Box><Typography variant="subtitle1" fontWeight={800} mb={1}>Workflow Status</Typography><Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>{workflow.map((status, index) => <Chip key={status} label={status} size="small" color={index === currentIndex ? "primary" : index < currentIndex ? "success" : "default"} variant={index <= currentIndex ? "filled" : "outlined"} sx={{ fontWeight: 800 }} />)}</Stack></Box>
          {role === "requester" && <Box sx={{ p: 1.7, borderRadius: 2.5, bgcolor: "rgba(148,163,184,0.05)", border: "1px solid rgba(148,163,184,0.10)" }}><Typography fontWeight={800}>Request tracking</Typography><Typography variant="body2" color="text.secondary" mt={0.35}>You can review your request, current status, and ETA. Developer assignment details are internal and are not shown here.</Typography></Box>}
        </Stack>
      </Paper>
    </Box>
  );
}
