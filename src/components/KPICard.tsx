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
        minHeight: 118,
        borderRadius: 3,
        border: "1px solid rgba(148,163,184,0.14)",
        background: "linear-gradient(145deg, rgba(24,34,53,0.98), rgba(15,23,42,0.98))",
        boxShadow: "0 10px 24px rgba(2,6,23,0.16)",
        position: "relative",
        overflow: "hidden",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 30px rgba(2,6,23,0.24)",
          borderColor: `${accentColor}44`,
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
      <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5}>
          <Box minWidth={0}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase" letterSpacing={0.55}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={850} mt={0.45} letterSpacing={-0.8} lineHeight={1.05}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" mt={0.65} display="block" noWrap>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 2.25,
              display: "grid",
              placeItems: "center",
              color: accentColor,
              bgcolor: `${accentColor}14`,
              border: `1px solid ${accentColor}2a`,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
