"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useSession } from "next-auth/react";
import Link from "next/link";
import theme from "~/theme";
import { Logo } from "./Logo";
import SignOutDialog from "./SignOutDialog";

const pages = [
  {
    name: "Meal Plans",
    href: "/meal-plans",
  },
];

const Navbar = () => {
  const { data: session } = useSession();

  const [signoutDialogOpen, setSignoutDialogOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.grey[900],
          backgroundImage: "none",
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <Logo />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Button
                    LinkComponent={Link}
                    href={page.href}
                    size="small"
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ mx: 1, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Logo />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  LinkComponent={Link}
                  href={page.href}
                  size="small"
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                LinkComponent={!session ? Link : undefined}
                href={!session ? "/api/auth/signin" : undefined}
                onClick={session ? () => setSignoutDialogOpen(true) : undefined}
                size="small"
                color="inherit"
                variant="outlined"
                sx={{ my: 2, display: "block" }}
              >
                {session ? "Sign out" : "Sign in"}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {signoutDialogOpen && (
        <SignOutDialog
          open={signoutDialogOpen}
          handleClose={() => setSignoutDialogOpen(false)}
        />
      )}
    </>
  );
};
export { Navbar };
