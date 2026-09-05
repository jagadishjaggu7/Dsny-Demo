import { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import type { Ticket } from "../types/ticket";
import PriorityBadge from "./PriorityBadge";
import StatusChip from "./StatusChip";

interface RecentTableProps {
  tickets: Ticket[];
  title?: string;
  subtitle?: string;
}

export default function RecentTable({
  tickets,
  title = "Recent Requests",
  subtitle = "Latest change requests and reporting/data issues across PTP, RTR, and DFS.",
}: RecentTableProps) {
  const [query, setQuery] = useState("");

  const filteredTickets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return tickets.slice(0, 10);

    return tickets
      .filter((ticket) =>
        [ticket.id, ticket.title, ticket.requestType, ticket.tower, ticket.requester].some((value) =>
          value.toLowerCase().includes(normalized),
        ),
      )
      .slice(0, 10);
  }, [query, tickets]);

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2.5,
        overflow: "hidden",
        border: "1px solid rgba(148,163,184,0.12)",
        borderRadius: 3,
        bgcolor: "rgba(17,24,39,0.82)",
        boxShadow: "0 14px 34px rgba(2,6,23,0.2)",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2,
          display: "flex",
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          borderBottom: "1px solid rgba(148,163,184,0.10)",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={800}>{title}</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.4}>{subtitle}</Typography>
        </Box>

        <TextField
          size="small"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search ID, title, type, tower or requester"
          aria-label="Search requests"
          sx={{
            width: { xs: "100%", sm: 350 },
            "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "rgba(15,23,42,0.7)" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer sx={{ maxHeight: 430 }}>
        <Table stickyHeader size="small" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              {["CR Number", "Type", "Title", "Tower", "Priority", "Status", "Requester", "ETA"].map((label) => (
                <TableCell key={label} sx={{ fontWeight: 800, bgcolor: "#162033", borderBottomColor: "rgba(148,163,184,0.14)", whiteSpace: "nowrap" }}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id} hover>
                <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>{ticket.id}</TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  <Chip
                    label={ticket.requestType === "Change Request" ? "Change" : "Data issue"}
                    size="small"
                    variant="outlined"
                    color={ticket.requestType === "Change Request" ? "primary" : "warning"}
                    sx={{ fontWeight: 700 }}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 250 }}>{ticket.title}</TableCell>
                <TableCell>{ticket.tower}</TableCell>
                <TableCell><PriorityBadge priority={ticket.priority} /></TableCell>
                <TableCell><StatusChip status={ticket.status} /></TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{ticket.requester}</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>{ticket.eta ?? "—"}</TableCell>
              </TableRow>
            ))}
            {filteredTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary">No requests match your search.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
