import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
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
        minHeight: 156,
        border: "1px solid rgba(148,163,184,0.12)",
        borderRadius: 3,
        background:
          "linear-gradient(155deg, rgba(30,41,59,0.96) 0%, rgba(15,23,42,0.98) 100%)",
        position: "relative",
        overflow: "hidden",
        transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "rgba(148,163,184,0.28)",
          boxShadow: "0 16px 32px rgba(2,6,23,0.28)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        }}
      />

      <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={700}>
              {title}
            </Typography>
            <Typography
              sx={{
                mt: 0.8,
                fontSize: "2rem",
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: -1,
              }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: 2.25,
              display: "grid",
              placeItems: "center",
              color: accentColor,
              bgcolor: `${accentColor}18`,
              border: `1px solid ${accentColor}2A`,
            }}
          >
            {icon}
          </Box>
        </Stack>

        {subtitle && (
          <Typography variant="caption" color="text.secondary" mt={1.4} display="block">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
