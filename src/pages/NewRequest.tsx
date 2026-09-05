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
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

import type { RequestType, TicketPriority } from "../types/ticket";

interface NewRequestProps {
  onCancel: () => void;
}

const heroImage = "https://cdn.wallpapersafari.com/22/45/E62Jvs.jpg";

const requestOptions: Array<{
  type: RequestType;
  title: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    type: "Change Request",
    title: "Change Request",
    description: "Request a new enhancement, rule, report change, or process improvement.",
    icon: <BuildOutlinedIcon />,
  },
  {
    type: "Reporting / Data Issue",
    title: "Reporting / Data Issue",
    description: "Report incorrect, missing, delayed, or inconsistent data in Power BI or another report.",
    icon: <BugReportOutlinedIcon />,
  },
];

export default function NewRequest({ onCancel }: NewRequestProps) {
  const [requestType, setRequestType] = useState<RequestType>("Change Request");
  const [submitted, setSubmitted] = useState(false);
  const [priority, setPriority] = useState<TicketPriority>("Medium");

  return (
    <Box sx={{ maxWidth: 1080, mx: "auto", pb: 5 }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 132, md: 145 },
          mb: 1.75,
          px: { xs: 2.5, md: 3.25 },
          py: { xs: 2.25, md: 2.5 },
          display: "flex",
          alignItems: "center",
          borderRadius: 3.5,
          border: "1px solid rgba(96,165,250,0.20)",
          backgroundImage: `linear-gradient(90deg, rgba(5,10,20,0.95) 0%, rgba(5,10,20,0.80) 55%, rgba(7,13,24,0.50) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 44%",
          boxShadow: "0 18px 44px rgba(2,6,23,0.22)",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.8}>
            <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "#60A5FA", boxShadow: "0 0 0 5px rgba(96,165,250,0.10)" }} />
            <Typography variant="caption" sx={{ color: "#BFDBFE", fontWeight: 900, letterSpacing: 1.35, textTransform: "uppercase" }}>
              Request intake
            </Typography>
          </Stack>
          <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, lineHeight: 1, fontWeight: 900, letterSpacing: -1.35, textShadow: "0 8px 28px rgba(0,0,0,0.38)" }}>
            Create a New Request
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mb: 2.75,
          px: { xs: 1.25, md: 1.75 },
          py: 1.15,
          borderLeft: "3px solid #4F8CFF",
          borderRadius: 1.5,
          bgcolor: "rgba(79,140,255,0.06)",
          borderTop: "1px solid rgba(79,140,255,0.10)",
          borderRight: "1px solid rgba(79,140,255,0.10)",
          borderBottom: "1px solid rgba(79,140,255,0.10)",
        }}
      >
        <Typography color="rgba(226,232,240,0.82)">
          Choose whether you are requesting a new change or reporting an issue with existing Power BI or report data.
        </Typography>
      </Box>

      {submitted && (
        <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
          Request captured as a demo submission. Persistence will be connected when the backend is added.
        </Alert>
      )}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>
        {requestOptions.map((option) => {
          const selected = requestType === option.type;
          return (
            <Card
              key={option.type}
              sx={{
                flex: 1,
                borderRadius: 3,
                border: selected ? "1px solid rgba(79,140,255,0.65)" : "1px solid rgba(148,163,184,0.12)",
                bgcolor: selected ? "rgba(30,48,80,0.65)" : "rgba(17,24,39,0.82)",
                boxShadow: selected ? "0 12px 30px rgba(37,99,235,0.16)" : "none",
              }}
            >
              <CardActionArea onClick={() => setRequestType(option.type)} sx={{ height: "100%" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 42, height: 42, borderRadius: 2, display: "grid", placeItems: "center", color: selected ? "primary.main" : "text.secondary", bgcolor: "rgba(79,140,255,0.08)" }}>
                      {option.icon}
                    </Box>
                    <Box>
                      <Typography fontWeight={800}>{option.title}</Typography>
                      {selected && <Chip label="Selected" size="small" color="primary" sx={{ mt: 0.45 }} />}
                    </Box>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mt={1.5}>
                    {option.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>

      <Box component="form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} sx={{ p: { xs: 2, md: 3 }, border: "1px solid rgba(148,163,184,0.12)", borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", boxShadow: "0 14px 34px rgba(2,6,23,0.18)" }}>
        <Stack spacing={2.25}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField fullWidth label="Title" required placeholder={requestType === "Change Request" ? "e.g. Add vendor payment KPI enhancement" : "e.g. Power BI KPI total does not match source"} />
            <FormControl fullWidth>
              <InputLabel id="tower-label">Tower</InputLabel>
              <Select labelId="tower-label" label="Tower" defaultValue="PTP">
                <MenuItem value="PTP">PTP · Procure to Pay</MenuItem>
                <MenuItem value="RTR">RTR · Record to Report</MenuItem>
                <MenuItem value="DFS">DFS · Disney Financial Services</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TextField fullWidth multiline minRows={4} label="Description" required placeholder={requestType === "Change Request" ? "Describe the requested change, business need, and expected outcome." : "Describe what is wrong, where it appears, and what you expected to see."} />

          {requestType === "Reporting / Data Issue" && (
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField fullWidth label="Report / Dashboard Name" required placeholder="e.g. Vendor Payment KPI" />
              <TextField fullWidth label="Reporting Month" required placeholder="e.g. Aug 2026" />
            </Stack>
          )}

          {requestType === "Reporting / Data Issue" && (
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField fullWidth label="Expected Value" placeholder="What should the report show?" />
              <TextField fullWidth label="Actual Value" placeholder="What does the report show?" />
            </Stack>
          )}

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <FormControl sx={{ minWidth: { md: 220 } }}>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select labelId="priority-label" label="Priority" value={priority} onChange={(event) => setPriority(event.target.value as TicketPriority)}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Requester Email" required defaultValue="disney.user@disney.com" />
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="flex-end" spacing={1.25}>
            <Button variant="text" onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained" startIcon={submitted ? <AddTaskOutlinedIcon /> : <SendOutlinedIcon />}>
              {submitted ? "Submit another request" : "Submit Request"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
