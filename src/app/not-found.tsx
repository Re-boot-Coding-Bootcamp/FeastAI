import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      gap={1}
      height={"85%"}
    >
      <Typography variant="subtitle1">404 | This page is not found</Typography>
      <Button
        LinkComponent={Link}
        href="/"
        size="small"
        variant="outlined"
        color="inherit"
      >
        Return to Home
      </Button>
    </Box>
  );
}
