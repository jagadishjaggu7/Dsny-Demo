import { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
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

import { tickets } from "../data/tickets";
import PriorityBadge from "./PriorityBadge";
import StatusChip from "./StatusChip";

export default function RecentTable() {
  const [query, setQuery] = useState("");

  const filteredTickets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return tickets.slice(0, 10);

    return tickets
      .filter((ticket) =>
        [ticket.id, ticket.title].some((value) =>
          value.toLowerCase().includes(normalized),
        ),
      )
      .slice(0, 10);
  }, [query]);

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 2.5 },
          display: "flex",
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={800}>
            Recent Change Requests
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Latest requests across PTP, RTR, and DFS.
          </Typography>
        </Box>

        <TextField
          size="small"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search CR number or title"
          aria-label="Search change requests"
          sx={{ width: { xs: "100%", sm: 290 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table size="small" sx={{ minWidth: 760 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>CR Number</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Tower</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Assignee</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>ETA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id} hover>
                <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                  {ticket.id}
                </TableCell>
                <TableCell sx={{ minWidth: 250 }}>{ticket.title}</TableCell>
                <TableCell>{ticket.tower}</TableCell>
                <TableCell>
                  <PriorityBadge priority={ticket.priority} />
                </TableCell>
                <TableCell>
                  <StatusChip status={ticket.status} />
                </TableCell>
                <TableCell>{ticket.requester}</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>{ticket.eta ?? "—"}</TableCell>
              </TableRow>
            ))}
            {filteredTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary">
                    No change requests match your search.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
