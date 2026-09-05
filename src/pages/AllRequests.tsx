import { Box } from "@mui/material";
import RecentTable from "../components/RecentTable";
import { tickets } from "../data/tickets";

export default function AllRequests() {
  return (
    <Box sx={{ maxWidth: 1480, mx: "auto", pb: 5 }}>
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", border: "1px solid rgba(96,165,250,0.16)" }}>
          <Box component="span" sx={{ display: "block", color: "#93C5FD", fontWeight: 800, fontSize: "0.75rem", letterSpacing: 1.2, textTransform: "uppercase" }}>Administration</Box>
          <Box component="h1" sx={{ m: 0, mt: 0.35, fontSize: { xs: "1.9rem", md: "2.35rem" }, fontWeight: 900, lineHeight: 1.05 }}>All Requests</Box>
          <Box component="p" sx={{ m: 0, mt: 0.8, color: "text.secondary" }}>Review all change and reporting/data requests across DSNY operations.</Box>
        </Box>
      </Box>
      <RecentTable
        tickets={tickets}
        title="All Requests"
        subtitle="Search all change requests and reporting/data issues across PTP, RTR, and DFS."
      />
    </Box>
  );
}
