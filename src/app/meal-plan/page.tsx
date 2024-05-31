"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Markdown from "react-markdown";

import { useAppContext } from "~/context";
import Link from "next/link";
import { useState } from "react";

export default function MealPlanDetailsPage() {
  const { mealPlan } = useAppContext();
  const [dailyMealPlanIndex, setDailyMealPlanIndex] = useState(0);

  const mealPlanPerDay = mealPlan
    ?.trim()
    .split("*** ")
    .filter((item) => item.includes("Day "));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setDailyMealPlanIndex(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Button
        LinkComponent={Link}
        href="/"
        size="small"
        variant="text"
        color="inherit"
        startIcon={<ArrowBackIcon />}
        sx={{ my: 1 }}
      >
        Back
      </Button>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {mealPlanPerDay && mealPlanPerDay.length === 7 ? (
          <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={dailyMealPlanIndex} onChange={handleTabChange}>
                {Array.from({ length: mealPlanPerDay.length }).map(
                  (_item, index) => {
                    const key = `Day ${index + 1}`;
                    return (
                      <Tab key={key} label={key} id={`simple-tab-${index}`} />
                    );
                  }
                )}
              </Tabs>
            </Box>
            <Markdown>
              {mealPlanPerDay[dailyMealPlanIndex]?.replace("***", "")}
            </Markdown>
          </>
        ) : (
          <Typography variant="body2">
            Something went wrong, please go back and try again.
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
