import { useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import KPICard from "../components/KPICard";
import RecentTable from "../components/RecentTable";
import StatusSplit from "../components/StatusSplit";
import TowerWorkload from "../components/TowerWorkload";
import { tickets } from "../data/tickets";
import type { TicketStatus } from "../types/ticket";

const workflowStatuses: TicketStatus[] = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];

const panelSx = {
  height: "100%",
  p: { xs: 2, md: 2.25 },
  borderRadius: 3,
  border: "1px solid rgba(148,163,184,0.11)",
  bgcolor: "#111827",
  boxShadow: "0 10px 26px rgba(2,6,23,0.12)",
};

export default function Dashboard() {
  const analytics = useMemo(() => {
    const statusCounts = workflowStatuses.reduce<Record<TicketStatus, number>>(
      (acc, status) => {
        acc[status] = tickets.filter((ticket) => ticket.status === status).length;
        return acc;
      },
      { New: 0, Assigned: 0, DEV: 0, QA: 0, PRD: 0, Closed: 0 },
    );

    const towerCounts = tickets.reduce<Record<string, number>>(
      (acc, ticket) => {
        acc[ticket.tower] = (acc[ticket.tower] ?? 0) + 1;
        return acc;
      },
      { PTP: 0, RTR: 0, DFS: 0 },
    );

    return { statusCounts, towerCounts };
  }, []);

  return (
    <Box sx={{ maxWidth: 1500, mx: "auto", pb: 4 }}>
      <Box mb={2.5}>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2rem", md: "2.3rem" },
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            Change Request Overview
          </Typography>
        </Box>
        <Typography color="text.secondary" mt={0.6}>
          Track request volume, workflow status, and tower workload.
        </Typography>
      </Box>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Total Requests" value={String(tickets.length)} subtitle="Requests tracked" icon={<AssignmentOutlinedIcon fontSize="small" />} accent="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Development" value={String(analytics.statusCounts.DEV)} subtitle="Being implemented" icon={<CodeOutlinedIcon fontSize="small" />} accent="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="QA Validation" value={String(analytics.statusCounts.QA)} subtitle="Awaiting validation" icon={<ScienceOutlinedIcon fontSize="small" />} accent="info" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Closed" value={String(analytics.statusCounts.Closed)} subtitle="Completed requests" icon={<CheckCircleIcon fontSize="small" />} accent="success" />
        </Grid>
      </Grid>

      <Grid container spacing={1.5} mt={1.5} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box sx={panelSx}>
            <StatusSplit data={analytics.statusCounts} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Box sx={panelSx}>
            <TowerWorkload data={analytics.towerCounts} />
          </Box>
        </Grid>
      </Grid>

      <RecentTable />
    </Box>
  );
}
