import { useMemo } from "react";
import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import KPICard from "../components/KPICard";
import RecentTable from "../components/RecentTable";
import StatusSplit from "../components/StatusSplit";
import TowerWorkload from "../components/TowerWorkload";
import { tickets } from "../data/tickets";
import type { TicketStatus } from "../types/ticket";

const workflowStatuses: TicketStatus[] = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];

const panelSx = {
  height: "100%",
  p: { xs: 2, sm: 2.5 },
  borderRadius: 3,
  border: "1px solid rgba(148,163,184,0.12)",
  bgcolor: "rgba(15,23,42,0.72)",
  boxShadow: "0 12px 28px rgba(2,6,23,0.14)",
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
    const highPriority = tickets.filter((ticket) => ["High", "Critical"].includes(ticket.priority)).length;

    return { statusCounts, towerCounts, active, highPriority };
  }, []);

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        gap={2}
        mb={2.5}
      >
        <Box>
          <Typography variant="h4" fontWeight={850} letterSpacing={-0.8}>
            Overview
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.55}>
            Monitor change requests, delivery progress, and operational workload.
          </Typography>
        </Box>
        <Chip
          icon={<AccessTimeOutlinedIcon sx={{ fontSize: "16px !important" }} />}
          label="Live dashboard"
          size="small"
          variant="outlined"
          sx={{ fontWeight: 700, borderColor: "rgba(79,140,255,0.28)" }}
        />
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Total Requests" value={String(tickets.length)} subtitle="Current dashboard feed" icon={<AssignmentOutlinedIcon fontSize="small" />} accent="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="In Development" value={String(analytics.statusCounts.DEV)} subtitle="Currently being implemented" icon={<CodeOutlinedIcon fontSize="small" />} accent="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="In QA" value={String(analytics.statusCounts.QA)} subtitle="Ready for validation" icon={<ScienceOutlinedIcon fontSize="small" />} accent="info" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KPICard title="Closed" value={String(analytics.statusCounts.Closed)} subtitle="Successfully completed" icon={<CheckCircleIcon fontSize="small" />} accent="success" />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={0.75}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper elevation={0} sx={panelSx}>
            <StatusSplit data={analytics.statusCounts} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper elevation={0} sx={panelSx}>
            <TowerWorkload data={analytics.towerCounts} />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={0.75}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ ...panelSx, minHeight: 104 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={800} textTransform="uppercase" letterSpacing={0.6}>
              Active workload
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={1} mt={0.35}>
              <Typography variant="h5" fontWeight={850}>{analytics.active}</Typography>
              <Typography variant="caption" color="text.secondary">open requests</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mt={0.25}>
              Requests still moving through the workflow.
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ ...panelSx, minHeight: 104 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={800} textTransform="uppercase" letterSpacing={0.6}>
              Priority exposure
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={1} mt={0.35}>
              <Typography variant="h5" fontWeight={850}>{analytics.highPriority}</Typography>
              <Typography variant="caption" color="text.secondary">high / critical</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mt={0.25}>
              Requests needing closer delivery attention.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <RecentTable />
    </Box>
  );
}
