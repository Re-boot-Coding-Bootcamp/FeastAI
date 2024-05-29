"use client";

import { Button, Container, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useAppContext } from "~/context";

export default function Home() {
  const { authMode, isGenerating } = useAppContext();
  const { data } = useSession();

  return (
    <Container maxWidth="xl">
      <Paper
        sx={{ p: 2, m: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="subtitle1">
          Hello, {authMode === "guest" ? "Guest" : data?.user.name}!
        </Typography>
        {isGenerating ? (
          <Typography variant="body2">{`We've got everything we need to work on your meal plan, you'll see it here when it's ready!`}</Typography>
        ) : (
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
        )}
      </Paper>
    </Container>
  );
}
