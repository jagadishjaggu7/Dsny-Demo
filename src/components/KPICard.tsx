import { Card, CardContent, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  accent?: "primary" | "success" | "warning" | "info";
}

const accentMap = {
  primary: "#4F8CFF",
  success: "#22C55E",
  warning: "#F59E0B",
  info: "#38BDF8",
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  accent = "primary",
}: KPICardProps) {
  const accentColor = accentMap[accent];

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid rgba(148, 163, 184, 0.14)",
        background:
          "linear-gradient(145deg, rgba(30,41,59,0.98), rgba(15,23,42,0.98))",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 4,
          height: "100%",
          bgcolor: accentColor,
        }}
      />
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {title}
          </Typography>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color: accentColor,
              bgcolor: `${accentColor}18`,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography variant="h4" fontWeight={800} mt={1.5} letterSpacing={-0.5}>
          {value}
        </Typography>

        {subtitle && (
          <Typography variant="caption" color="text.secondary" mt={0.75} display="block">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
