import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
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

export default function KPICard({ title, value, subtitle, icon, accent = "primary" }: KPICardProps) {
  const accentColor = accentMap[accent];

  return (
    <Card
      elevation={0}
      sx={{
        minHeight: 112,
        height: "100%",
        borderRadius: 2.75,
        border: "1px solid rgba(148,163,184,0.12)",
        background: "linear-gradient(145deg, rgba(24,34,53,0.96), rgba(15,23,42,0.98))",
        boxShadow: "0 8px 22px rgba(2,6,23,0.15)",
        position: "relative",
        overflow: "hidden",
        transition: "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 14px 28px rgba(2,6,23,0.22)",
          borderColor: `${accentColor}40`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0 auto 0 0",
          width: 3,
          bgcolor: accentColor,
        },
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5}>
          <Box minWidth={0}>
            <Typography variant="caption" color="text.secondary" fontWeight={750} letterSpacing={0.5}>
              {title}
            </Typography>
            <Typography sx={{ mt: 0.25, fontSize: "2rem", lineHeight: 1, fontWeight: 850, letterSpacing: -0.8 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" mt={0.7} display="block" noWrap>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: 2, display: "grid", placeItems: "center", color: accentColor, bgcolor: `${accentColor}12`, border: `1px solid ${accentColor}28` }}>
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
