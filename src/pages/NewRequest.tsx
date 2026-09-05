import { useState } from "react";
import type { ReactNode } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import type { RequestType, TicketPriority } from "../types/ticket";
import { towers } from "../data/towers";

interface NewRequestProps {
  onCancel: () => void;
}

const requestOptions: Array<{
  type: RequestType;
  title: string;
  description: string;
  icon: ReactNode;
}> = [
  { type: "Change Request", title: "Change Request", description: "Request a new enhancement, rule, report change, or process improvement.", icon: <BuildOutlinedIcon /> },
  { type: "Reporting / Data Issue", title: "Reporting / Data Issue", description: "Report incorrect, missing, delayed, or inconsistent data in Power BI or another report.", icon: <BugReportOutlinedIcon /> },
];

export default function NewRequest({ onCancel }: NewRequestProps) {
  const [requestType, setRequestType] = useState<RequestType>("Change Request");
  const [submitted, setSubmitted] = useState(false);
  const [priority, setPriority] = useState<TicketPriority>("Medium");

  return (
    <Box sx={{ maxWidth: 1080, mx: "auto", pb: 5 }}>
      <Box sx={{ mb: 1.5, p: { xs: 2, md: 2.5 }, display: "flex", alignItems: "center", borderRadius: 3, border: "1px solid rgba(96,165,250,0.16)", background: "linear-gradient(135deg, rgba(30,48,80,0.42) 0%, rgba(17,24,39,0.82) 58%, rgba(11,18,32,0.94) 100%)", boxShadow: "0 14px 34px rgba(2,6,23,0.18)" }}>
        <Stack direction="row" spacing={1.1} alignItems="center">
          <Box sx={{ width: 40, height: 40, borderRadius: 2.25, display: "grid", placeItems: "center", bgcolor: "rgba(79,140,255,0.10)", border: "1px solid rgba(79,140,255,0.18)", color: "#93C5FD" }}><BuildOutlinedIcon /></Box>
          <Box><Typography variant="caption" sx={{ color: "#BFDBFE", fontWeight: 900, letterSpacing: 1.3, textTransform: "uppercase" }}>Request Intake</Typography><Typography component="h1" sx={{ mt: 0.25, fontSize: { xs: "1.82rem", md: "2.35rem" }, lineHeight: 1.02, fontWeight: 900, letterSpacing: -1.05 }}>Create a New Request</Typography></Box>
        </Stack>
      </Box>

      <Box sx={{ mb: 2.75, px: { xs: 1.5, md: 1.9 }, py: 1.15, display: "flex", alignItems: "center", gap: 1.05, borderLeft: "3px solid #4F8CFF", borderRadius: 1.5, bgcolor: "rgba(79,140,255,0.055)", borderTop: "1px solid rgba(79,140,255,0.10)", borderRight: "1px solid rgba(79,140,255,0.10)", borderBottom: "1px solid rgba(79,140,255,0.10)" }}>
        <BuildOutlinedIcon sx={{ color: "#93C5FD", fontSize: 18, flexShrink: 0 }} />
        <Typography color="rgba(226,232,240,0.84)">Choose whether you are requesting a new change or reporting an issue with existing Power BI or report data.</Typography>
      </Box>

      {submitted && <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>Request captured as a demo submission. Persistence will be connected when the backend is added.</Alert>}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>
        {requestOptions.map((option) => {
          const selected = requestType === option.type;
          return <Card key={option.type} sx={{ flex: 1, borderRadius: 3, border: selected ? "1px solid rgba(79,140,255,0.65)" : "1px solid rgba(148,163,184,0.12)", bgcolor: selected ? "rgba(30,48,80,0.65)" : "rgba(17,24,39,0.82)", boxShadow: selected ? "0 12px 30px rgba(37,99,235,0.16)" : "none" }}><CardActionArea onClick={() => setRequestType(option.type)} sx={{ height: "100%" }}><CardContent sx={{ p: 2.5 }}><Stack direction="row" alignItems="center" spacing={1.5}><Box sx={{ width: 42, height: 42, borderRadius: 2, display: "grid", placeItems: "center", color: selected ? "primary.main" : "text.secondary", bgcolor: "rgba(79,140,255,0.08)" }}>{option.icon}</Box><Box><Typography fontWeight={800}>{option.title}</Typography>{selected && <Chip label="Selected" size="small" color="primary" sx={{ mt: 0.45 }} />}</Box></Stack><Typography variant="body2" color="text.secondary" mt={1.5}>{option.description}</Typography></CardContent></CardActionArea></Card>;
        })}
      </Stack>

      <Box component="form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} sx={{ p: { xs: 2, md: 3 }, border: "1px solid rgba(148,163,184,0.12)", borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", boxShadow: "0 14px 34px rgba(2,6,23,0.18)" }}>
        <Stack spacing={2.25}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField fullWidth label="Title" required placeholder={requestType === "Change Request" ? "e.g. Add vendor payment KPI enhancement" : "e.g. Power BI KPI total does not match source"} />
            <FormControl fullWidth>
              <InputLabel id="tower-label">Tower</InputLabel>
              <Select labelId="tower-label" label="Tower" defaultValue="">
                <MenuItem value="" disabled>Select a tower</MenuItem>
                {towers.map((tower) => <MenuItem key={tower.code} value={tower.code}>{tower.code} · {tower.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>

          <TextField fullWidth multiline minRows={4} label="Description" required placeholder={requestType === "Change Request" ? "Describe the requested change, business need, and expected outcome." : "Describe what is wrong, where it appears, and what you expected to see."} />

          {requestType === "Reporting / Data Issue" && <Stack direction={{ xs: "column", md: "row" }} spacing={2}><TextField fullWidth label="Report / Dashboard Name" required placeholder="e.g. Vendor Payment KPI" /><TextField fullWidth label="Reporting Month" required placeholder="e.g. Aug 2026" /></Stack>}
          {requestType === "Reporting / Data Issue" && <Stack direction={{ xs: "column", md: "row" }} spacing={2}><TextField fullWidth label="Expected Value" placeholder="What should the report show?" /><TextField fullWidth label="Actual Value" placeholder="What does the report show?" /></Stack>}

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <FormControl sx={{ minWidth: { md: 220 } }}><InputLabel id="priority-label">Priority</InputLabel><Select labelId="priority-label" label="Priority" value={priority} onChange={(event) => setPriority(event.target.value as TicketPriority)}><MenuItem value="Low">Low</MenuItem><MenuItem value="Medium">Medium</MenuItem><MenuItem value="High">High</MenuItem><MenuItem value="Critical">Critical</MenuItem></Select></FormControl>
            <TextField fullWidth label="Requester Email" defaultValue="disney.user@disney.com" disabled helperText="In the company version, this will come from the signed-in OAuth account." />
          </Stack>

          <Divider />
          <Stack direction="row" justifyContent="flex-end" spacing={1.25}><Button variant="text" onClick={onCancel}>Cancel</Button><Button type="submit" variant="contained" startIcon={submitted ? <AddTaskOutlinedIcon /> : <SendOutlinedIcon />}>{submitted ? "Submit another request" : "Submit Request"}</Button></Stack>
        </Stack>
      </Box>
    </Box>
  );
}
