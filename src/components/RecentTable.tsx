import { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Box, Chip, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Typography } from "@mui/material";
import type { Ticket } from "../types/ticket";
import PriorityBadge from "./PriorityBadge";
import StatusChip from "./StatusChip";
import { getRequestTypeLabel, getTicketDisplayTitle } from "../utils/ticketDisplay";

interface RecentTableProps {
  tickets: Ticket[];
  title?: string;
  subtitle?: string;
  onTicketClick?: (ticket: Ticket) => void;
}

type SortKey = "id" | "requestType" | "title" | "tower" | "priority" | "status" | "requester" | "eta";
type SortDirection = "asc" | "desc";

const statusOrder = ["New", "Assigned", "DEV", "QA", "PRD", "Closed"];
const priorityOrder = ["Low", "Medium", "High", "Critical"];

const sortableHeaders: Array<{ key: SortKey; label: string }> = [
  { key: "id", label: "CR Number" },
  { key: "requestType", label: "Type" },
  { key: "title", label: "Title" },
  { key: "tower", label: "Tower" },
  { key: "priority", label: "Priority" },
  { key: "status", label: "Status" },
  { key: "requester", label: "Requester" },
  { key: "eta", label: "ETA" },
];

export default function RecentTable({ tickets, title = "Recent Requests", subtitle = "Latest change requests and reporting/data issues across PTP, RTR, and DFS.", onTicketClick }: RecentTableProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => current === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredTickets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const searched = normalized
      ? tickets.filter((ticket) => [ticket.id, ticket.title, ticket.requestType, ticket.tower, ticket.requester].some((value) => value.toLowerCase().includes(normalized)))
      : [...tickets];

    const getSortValue = (ticket: Ticket): string | number => {
      switch (sortKey) {
        case "priority": return priorityOrder.indexOf(ticket.priority);
        case "status": return statusOrder.indexOf(ticket.status);
        case "eta": return ticket.eta ?? "";
        case "requestType": return ticket.requestType;
        case "title": return getTicketDisplayTitle(ticket);
        case "tower": return ticket.tower;
        case "requester": return ticket.requester;
        case "id": return ticket.id;
      }
    };

    return searched.sort((a, b) => {
      const first = getSortValue(a);
      const second = getSortValue(b);
      const comparison = typeof first === "number" && typeof second === "number"
        ? first - second
        : String(first).localeCompare(String(second), undefined, { numeric: true, sensitivity: "base" });
      return sortDirection === "asc" ? comparison : -comparison;
    }).slice(0, 10);
  }, [query, tickets, sortKey, sortDirection]);

  return (
    <Paper elevation={0} sx={{ mt: 2.5, overflow: "hidden", border: "1px solid rgba(148,163,184,0.12)", borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", boxShadow: "0 14px 34px rgba(2,6,23,0.2)" }}>
      <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 2, display: "flex", gap: 2, alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, borderBottom: "1px solid rgba(148,163,184,0.10)" }}>
        <Box><Typography variant="h6" fontWeight={800}>{title}</Typography><Typography variant="body2" color="text.secondary" mt={0.4}>{subtitle}</Typography></Box>
        <TextField size="small" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ID, title, type, tower or requester" aria-label="Search requests" sx={{ width: { xs: "100%", sm: 350 }, "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "rgba(15,23,42,0.7)" } }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} />
      </Box>
      <TableContainer sx={{ maxHeight: 430 }}>
        <Table stickyHeader size="small" sx={{ minWidth: 900 }}>
          <TableHead><TableRow>{sortableHeaders.map((header) => <TableCell key={header.key} sortDirection={sortKey === header.key ? sortDirection : false} sx={{ fontWeight: 800, bgcolor: "#162033", borderBottomColor: "rgba(148,163,184,0.14)", whiteSpace: "nowrap" }}><TableSortLabel active={sortKey === header.key} direction={sortKey === header.key ? sortDirection : "asc"} onClick={() => handleSort(header.key)} IconComponent={sortDirection === "asc" ? ArrowUpwardRoundedIcon : ArrowDownwardRoundedIcon}>{header.label}</TableSortLabel></TableCell>)}</TableRow></TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => <TableRow key={ticket.id} hover onClick={() => onTicketClick?.(ticket)} sx={{ cursor: onTicketClick ? "pointer" : "default" }}>
              <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>{ticket.id}</TableCell>
              <TableCell sx={{ minWidth: 150 }}><Chip label={getRequestTypeLabel(ticket.requestType)} size="small" variant="outlined" color={ticket.requestType === "Change Request" ? "primary" : "warning"} sx={{ fontWeight: 700 }} /></TableCell>
              <TableCell sx={{ minWidth: 280 }}>{getTicketDisplayTitle(ticket)}</TableCell>
              <TableCell>{ticket.tower}</TableCell>
              <TableCell><PriorityBadge priority={ticket.priority} /></TableCell>
              <TableCell><StatusChip status={ticket.status} /></TableCell>
              <TableCell sx={{ color: "text.secondary" }}>{ticket.requester}</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>{ticket.status === "Closed" ? "Completed" : ticket.eta ?? "ETA not yet updated"}</TableCell>
            </TableRow>)}
            {filteredTickets.length === 0 && <TableRow><TableCell colSpan={8} align="center" sx={{ py: 5 }}><Typography color="text.secondary">No requests match your search.</Typography></TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
