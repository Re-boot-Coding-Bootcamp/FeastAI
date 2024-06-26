"use client";

import {
  Button,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";
import { useAppContext } from "~/context";

export default function Home() {
  const { mealPlan, authMode, isGenerating } = useAppContext();
  const { data } = useSession();

  const homepageContent = useMemo(() => {
    if (mealPlan) {
      return (
        <>
          <Typography variant="body2">{`Your mean plan is ready, click on the button down below to check it out!`}</Typography>
          <Button
            LinkComponent={Link}
            href={"/meal-plan"}
            variant="contained"
            id="meal-plan-nav-button"
            sx={{ width: "fit-content" }}
          >
            See Meal Plan Details
          </Button>
        </>
      );
    }

    if (isGenerating) {
      return (
        <>
          <Typography variant="body2">{`We're working on your meal plan now, you'll see it here when it's ready!`}</Typography>
          <LinearProgress />
        </>
      );
    }

    return (
      <>
        <Typography variant="body2">{`It seems like you don't have any meal plans yet, to get started, click on the button below to answer some questions!`}</Typography>
        <Button
          LinkComponent={Link}
          href={"/questions"}
          variant="outlined"
          color="inherit"
          sx={{ width: "fit-content" }}
        >
          Start The Questionaire
        </Button>
      </>
    );
  }, [isGenerating, mealPlan]);

  return (
    <Container maxWidth="xl">
      <Paper
        sx={{ p: 2, my: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="subtitle1">
          Hello, {authMode === "guest" ? "Guest" : data?.user.name}!
        </Typography>
        {homepageContent}
      </Paper>
    </Container>
  );
}
