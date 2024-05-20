"use client";

import { Button, Container, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useAppContext } from "~/context";

export default function Home() {
  const { authMode } = useAppContext();
  const { data } = useSession();

  return (
    <Container maxWidth="xl">
      <Paper
        sx={{ p: 2, m: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography>
          Hello, {authMode === "guest" ? "Guest" : data?.user.name}!
        </Typography>
        <Button
          LinkComponent={Link}
          href={"/questions"}
          variant="outlined"
          color="inherit"
          sx={{ width: "fit-content" }}
        >
          Start The Questionaire
        </Button>
      </Paper>
    </Container>
  );
}
