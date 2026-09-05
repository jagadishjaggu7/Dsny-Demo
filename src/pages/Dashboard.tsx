import { Box, Paper, Typography } from "@mui/material";

const cards = [
  { title: "Total Requests", value: "142" },
  { title: "DEV", value: "18" },
  { title: "QA", value: "9" },
  { title: "Closed", value: "101" },
];

export default function Dashboard() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
      gap={3}
    >
      {cards.map((card) => (
        <Paper key={card.title} sx={{ p: 3, borderRadius: 3 }}>
          <Typography color="gray">{card.title}</Typography>
          <Typography variant="h4" fontWeight="bold" mt={1}>
            {card.value}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}