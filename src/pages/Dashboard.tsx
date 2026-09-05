import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CodeIcon from "@mui/icons-material/Code";
import ScienceIcon from "@mui/icons-material/Science";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupWorkIcon from "@mui/icons-material/GroupWork";

import KPICard from "../components/KPICard";
import RecentTable from "../components/RecentTable";
import { tickets } from "../data/tickets";

const statusOrder = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"] as const;

export default function Dashboard() {
  const analytics = useMemo(() => {
    const counts = Object.fromEntries(
      statusOrder.map((status) => [
        status,
        tickets.filter((ticket) => ticket.status === status).length,
      ]),
    ) as Record<(typeof statusOrder)[number], number>;

    const active = tickets.filter((ticket) => ticket.status !== "Closed").length;

    const workload = [
      { tower: "PTP", count: tickets.filter((ticket) => ticket.tower === "PTP").length },
      { tower: "RTR", count: tickets.filter((ticket) => ticket.tower === "RTR").length },
      { tower: "DFS", count: tickets.filter((ticket) => ticket.tower === "DFS").length },
    ];

    return { counts, active, workload };
  }, []);

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" fontWeight={800} letterSpacing={-0.5}>
          Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Monitor DSNY change requests, delivery progress, and workload.
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        gap={2.5}
        sx={{
          "@media (max-width: 1100px)": {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          },
          "@media (max-width: 650px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <KPICard
          title="Total Requests"
          value={tickets.length.toString()}
          subtitle="Latest requests in the dashboard feed"
          icon={<AssignmentIcon fontSize="small" />}
          accent="primary"
        />

        <KPICard
          title="In Development"
          value={analytics.counts.DEV.toString()}
          subtitle="Currently being implemented"
          icon={<CodeIcon fontSize="small" />}
          accent="warning"
        />

        <KPICard
          title="In QA"
          value={analytics.counts.QA.toString()}
          subtitle="Ready for validation"
          icon={<ScienceIcon fontSize="small" />}
          accent="info"
        />

        <KPICard
          title="Closed"
          value={analytics.counts.Closed.toString()}
          subtitle="Successfully completed requests"
          icon={<CheckCircleIcon fontSize="small" />}
          accent="success"
        />
      </Box>

      <Box
        mt={3}
        display="grid"
        gridTemplateColumns="1.35fr 1fr"
        gap={2.5}
        sx={{
          "@media (max-width: 900px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          p={2.5}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.25}>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Status Split
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.25}>
                Current workflow distribution
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {analytics.active} active
            </Typography>
          </Box>

          <Box display="grid" gridTemplateColumns="repeat(3, minmax(0, 1fr))" gap={1.5}>
            {statusOrder.map((status) => (
              <Box
                key={status}
                p={1.5}
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {status}
                </Typography>
                <Typography variant="h5" fontWeight={800} mt={0.25}>
                  {analytics.counts[status]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          p={2.5}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <GroupWorkIcon fontSize="small" />
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Workload by Tower
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tickets represented in the current feed
              </Typography>
            </Box>
          </Box>

          <Box display="grid" gap={1.25}>
            {analytics.workload.map(({ tower, count }) => (
              <Box
                key={tower}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={1.5}
                py={1.25}
                sx={{
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Typography fontWeight={700}>{tower}</Typography>
                <Typography fontWeight={800}>{count}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <RecentTable />
    </Box>
  );
}
