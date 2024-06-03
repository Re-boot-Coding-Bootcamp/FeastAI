import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImage from "~/assets/feast-ai-logo.png";

const Logo = (): JSX.Element => {
  return (
    <Box
      component={Link}
      href="/"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={LogoImage} alt="logo" height={50} width={50} />
    </Box>
  );
};

export { Logo };
