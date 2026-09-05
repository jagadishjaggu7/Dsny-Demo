import { useMemo } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
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
  p: { xs: 2, md: 2.5 },
  borderRadius: 3,
  border: "1px solid rgba(148,163,184,0.11)",
  bgcolor: "#111827",
  boxShadow: "0 14px 36px rgba(2,6,23,0.16)",
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
    <Box sx={{ maxWidth: 1500, mx: "auto", pb: 5, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: -70,
          right: -90,
          width: 320,
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,140,255,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          mb: 2.5,
          px: { xs: 2, md: 2.5 },
          py: { xs: 2, md: 2.25 },
          borderRadius: 3,
          border: "1px solid rgba(79,140,255,0.14)",
          background: "linear-gradient(135deg, rgba(24,34,53,0.85), rgba(15,23,42,0.5))",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "linear-gradient(90deg, black 0%, transparent 75%)",
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.7}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 0 0 5px rgba(79,140,255,0.10)" }} />
            <Typography variant="caption" color="text.secondary" fontWeight={800} letterSpacing={0.8} textTransform="uppercase">
              Admin workspace
            </Typography>
          </Stack>
          <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.4rem" }, lineHeight: 1.04, fontWeight: 850, letterSpacing: -1.1 }}>
            Change Request Overview
          </Typography>
          <Typography color="text.secondary" mt={0.7}>
            Track request volume, workflow status, and tower workload.
          </Typography>
        </Box>
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
