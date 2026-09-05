import { useMemo } from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/AssignmentOutlined";
import CodeIcon from "@mui/icons-material/CodeOutlined";
import ScienceIcon from "@mui/icons-material/ScienceOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTimeOutlined";

import KPICard from "../components/KPICard";
import RecentTable from "../components/RecentTable";
import StatusSplit from "../components/StatusSplit";
import TowerWorkload from "../components/TowerWorkload";
import { tickets } from "../data/tickets";
import type { TicketStatus } from "../types/ticket";

const workflowStatuses: TicketStatus[] = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];

const cardSx = {
  p: { xs: 2, sm: 2.5 },
  height: "100%",
  borderRadius: 3,
  border: "1px solid rgba(148,163,184,0.12)",
  bgcolor: "rgba(17,24,39,0.82)",
  boxShadow: "0 14px 34px rgba(2,6,23,0.18)",
};

export default function Dashboard() {
  const analytics = useMemo(() => {
    const statusCounts = workflowStatuses.reduce<Record<TicketStatus, number>>(
      (acc, status) => ({ ...acc, [status]: tickets.filter((ticket) => ticket.status === status).length }),
      { New: 0, Assigned: 0, DEV: 0, QA: 0, PRD: 0, Closed: 0 },
    );

    const towerCounts: Record<string, number> = { PTP: 0, RTR: 0, DFS: 0 };
    tickets.forEach((ticket) => { towerCounts[ticket.tower] += 1; });

    const active = tickets.filter((ticket) => ticket.status !== "Closed").length;
    const highPriority = tickets.filter(
      (ticket) => ticket.priority === "High" || ticket.priority === "Critical",
    ).length;

    return { statusCounts, towerCounts, active, highPriority };
  }, []);

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        justifyContent="space-between"
        gap={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>Overview</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.65}>
            Monitor DSNY change requests, delivery progress, and workload.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
          <AccessTimeIcon sx={{ fontSize: 18 }} />
          <Typography variant="caption" fontWeight={700}>Live dashboard feed</Typography>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Total Requests" value={String(tickets.length)} subtitle="Requests in the current dashboard feed" icon={<AssignmentIcon fontSize="small" />} accent="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="In Development" value={String(analytics.statusCounts.DEV)} subtitle="Currently being implemented" icon={<CodeIcon fontSize="small" />} accent="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="In QA" value={String(analytics.statusCounts.QA)} subtitle="Ready for validation" icon={<ScienceIcon fontSize="small" />} accent="info" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Closed" value={String(analytics.statusCounts.Closed)} subtitle="Successfully completed requests" icon={<CheckCircleIcon fontSize="small" />} accent="success" />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={0.2}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper elevation={0} sx={cardSx}><StatusSplit data={analytics.statusCounts} /></Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper elevation={0} sx={cardSx}><TowerWorkload data={analytics.towerCounts} /></Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={0.2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ ...cardSx, minHeight: 108 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>Active workload</Typography>
            <Typography variant="h5" fontWeight={800} mt={0.5}>{analytics.active}</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.35}>Requests still moving through the workflow.</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ ...cardSx, minHeight: 108 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>High priority exposure</Typography>
            <Typography variant="h5" fontWeight={800} mt={0.5}>{analytics.highPriority}</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.35}>High and critical requests in the current feed.</Typography>
          </Paper>
        </Grid>
      </Grid>

      <RecentTable />
    </Box>
  );
}
