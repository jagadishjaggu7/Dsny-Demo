import { Box, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CodeIcon from "@mui/icons-material/Code";
import ScienceIcon from "@mui/icons-material/Science";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import KPICard from "../components/KPICard";

export default function Dashboard() {
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
          value="142"
          subtitle="Across all active and closed requests"
          icon={<AssignmentIcon fontSize="small" />}
          accent="primary"
        />

        <KPICard
          title="In Development"
          value="18"
          subtitle="Currently being implemented"
          icon={<CodeIcon fontSize="small" />}
          accent="warning"
        />

        <KPICard
          title="In QA"
          value="9"
          subtitle="Ready for validation"
          icon={<ScienceIcon fontSize="small" />}
          accent="info"
        />

        <KPICard
          title="Closed"
          value="101"
          subtitle="Successfully completed requests"
          icon={<CheckCircleIcon fontSize="small" />}
          accent="success"
        />
      </Box>

      <Box
        mt={3}
        p={2.5}
        sx={{
          border: "1px solid rgba(148, 163, 184, 0.14)",
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Recent Change Requests
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Ticket table and status analytics will be added in Phase 2.
        </Typography>
      </Box>
    </Box>
  );
}
