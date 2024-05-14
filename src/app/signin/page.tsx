"use client";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useState } from "react";
import theme from "~/theme";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          maxWidth: "480px",
          width: "100%",
          py: "120px",
          px: 2,
        }}
      >
        <Stack gap={2}>
          <Typography variant="h6" fontWeight="fontWeightBold">
            Sign in to Feast AI
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>New user?</Typography>
            <Typography
              component={Link}
              href={"/signup"}
              sx={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Create an account
            </Typography>
          </Box>
          <TextField id="email" label="Email" variant="outlined" />
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained">Login</Button>
        </Stack>
      </Box>
    </Box>
  );
}
