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
  border: "1px solid rgba(148,163,184,0.10)",
  bgcolor: "rgba(15,23,42,0.78)",
  boxShadow: "0 10px 28px rgba(2,6,23,0.16)",
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
    <Box sx={{ maxWidth: 1480, mx: "auto", pb: 5 }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 150, md: 168 },
          mb: 2.25,
          px: { xs: 2.25, md: 3 },
          py: { xs: 2.25, md: 2.75 },
          display: "flex",
          alignItems: "center",
          borderRadius: 3.5,
          border: "1px solid rgba(79,140,255,0.16)",
          background:
            "radial-gradient(circle at 82% 20%, rgba(79,140,255,0.17), transparent 30%), linear-gradient(135deg, rgba(20,31,52,0.98), rgba(11,18,32,0.94))",
          boxShadow: "0 18px 46px rgba(2,6,23,0.18)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.035) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "linear-gradient(90deg, black 0%, rgba(0,0,0,0.55) 55%, transparent 90%)",
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: 180,
            height: 180,
            right: -60,
            top: -80,
            borderRadius: "50%",
            border: "1px solid rgba(79,140,255,0.10)",
            boxShadow: "0 0 0 28px rgba(79,140,255,0.025), 0 0 0 56px rgba(79,140,255,0.018)",
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: "#7FB0FF", fontWeight: 800, letterSpacing: 1.1, textTransform: "uppercase" }}
          >
            DSNY · Administration
          </Typography>
          <Typography
            component="h1"
            sx={{
              mt: 0.45,
              fontSize: { xs: "2rem", md: "2.65rem" },
              lineHeight: 1,
              fontWeight: 850,
              letterSpacing: -1.2,
            }}
          >
            Change Request Overview
          </Typography>
          <Typography color="text.secondary" mt={0.75} sx={{ maxWidth: 760 }}>
            A clear view of request volume, workflow status, and business-tower workload.
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
