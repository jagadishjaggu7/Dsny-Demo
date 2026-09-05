import { useMemo, useState } from "react";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";

import KPICard from "../components/KPICard";
import RecentTable from "../components/RecentTable";
import StatusSplit from "../components/StatusSplit";
import TowerWorkload from "../components/TowerWorkload";
import { tickets } from "../data/tickets";
import type { RequestType, TicketStatus } from "../types/ticket";

const workflowStatuses: TicketStatus[] = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];
type DashboardRequestFilter = RequestType | "All Requests";

const panelSx = {
  height: "100%",
  p: { xs: 2, md: 2.5 },
  borderRadius: 3,
  border: "1px solid rgba(148,163,184,0.10)",
  bgcolor: "#111827",
  boxShadow: "0 12px 30px rgba(2,6,23,0.14)",
};

const heroImage = "https://cdn.wallpapersafari.com/22/45/E62Jvs.jpg";

export default function Dashboard() {
  const [requestFilter, setRequestFilter] = useState<DashboardRequestFilter>("Change Request");

  const filteredTickets = useMemo(() => {
    if (requestFilter === "All Requests") return tickets;
    return tickets.filter((ticket) => ticket.requestType === requestFilter);
  }, [requestFilter]);

  const analytics = useMemo(() => {
    const statusCounts = workflowStatuses.reduce<Record<TicketStatus, number>>(
      (acc, status) => {
        acc[status] = filteredTickets.filter((ticket) => ticket.status === status).length;
        return acc;
      },
      { New: 0, Assigned: 0, DEV: 0, QA: 0, PRD: 0, Closed: 0 },
    );

    const towerCounts = filteredTickets.reduce<Record<string, number>>(
      (acc, ticket) => {
        acc[ticket.tower] = (acc[ticket.tower] ?? 0) + 1;
        return acc;
      },
      { PTP: 0, RTR: 0, DFS: 0 },
    );

    return { statusCounts, towerCounts };
  }, [filteredTickets]);

  return (
    <Box sx={{ maxWidth: 1480, mx: "auto", pb: 5 }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 128, md: 142 },
          mb: 1.75,
          px: { xs: 2.5, md: 3.25 },
          py: { xs: 2.25, md: 2.5 },
          display: "flex",
          alignItems: "center",
          borderRadius: 3.5,
          border: "1px solid rgba(96,165,250,0.20)",
          backgroundImage: `linear-gradient(90deg, rgba(5,10,20,0.94) 0%, rgba(5,10,20,0.78) 55%, rgba(7,13,24,0.48) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 44%",
          boxShadow: "0 18px 44px rgba(2,6,23,0.22)",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.8}>
            <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "#60A5FA", boxShadow: "0 0 0 5px rgba(96,165,250,0.10)" }} />
            <Typography variant="caption" sx={{ color: "#BFDBFE", fontWeight: 900, letterSpacing: 1.35, textTransform: "uppercase" }}>
              Administration
            </Typography>
          </Stack>
          <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, lineHeight: 1, fontWeight: 900, letterSpacing: -1.35, textShadow: "0 8px 28px rgba(0,0,0,0.38)" }}>
            Change Request Overview
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mb: 2.5,
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
        <Typography color="rgba(226,232,240,0.82)" sx={{ fontSize: { xs: "0.92rem", md: "0.98rem" } }}>
          Monitor request volume, workflow status, and delivery workload across DSNY operations.
        </Typography>
      </Box>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Total Requests" value={String(tickets.length)} subtitle="All requests tracked" icon={<AssignmentOutlinedIcon fontSize="small" />} accent="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Development" value={String(tickets.filter((ticket) => ticket.status === "DEV").length)} subtitle="All requests tracked" icon={<CodeOutlinedIcon fontSize="small" />} accent="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="QA Validation" value={String(tickets.filter((ticket) => ticket.status === "QA").length)} subtitle="All requests tracked" icon={<ScienceOutlinedIcon fontSize="small" />} accent="info" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Closed" value={String(tickets.filter((ticket) => ticket.status === "Closed").length)} subtitle="All requests tracked" icon={<CheckCircleIcon fontSize="small" />} accent="success" />
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: { xs: 2, md: 2.25 },
          mb: 1.5,
          px: { xs: 0, md: 0.25 },
          display: "flex",
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Stack direction="row" spacing={1.1} alignItems="center">
          <Box sx={{ width: 34, height: 34, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: "rgba(79,140,255,0.10)", border: "1px solid rgba(79,140,255,0.14)", color: "primary.main" }}>
            <InsightsOutlinedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={800}>Analytics view</Typography>
            <Typography variant="body2" color="text.secondary">Filter both panels by request type.</Typography>
          </Box>
        </Stack>
        <FormControl size="small" sx={{ minWidth: { xs: "100%", md: 260 } }}>
          <InputLabel id="request-filter-label">Request type</InputLabel>
          <Select
            labelId="request-filter-label"
            label="Request type"
            value={requestFilter}
            onChange={(event) => setRequestFilter(event.target.value as DashboardRequestFilter)}
          >
            <MenuItem value="Change Request">Change Requests</MenuItem>
            <MenuItem value="Reporting / Data Issue">Reporting / Data Issues</MenuItem>
            <MenuItem value="All Requests">All Requests</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={1.5} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box sx={panelSx}><StatusSplit data={analytics.statusCounts} /></Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Box sx={panelSx}><TowerWorkload data={analytics.towerCounts} /></Box>
        </Grid>
      </Grid>

      <RecentTable />
    </Box>
  );
}
