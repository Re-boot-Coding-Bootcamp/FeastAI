"use client";

import {
  Alert,
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
import { useEffect, useState } from "react";
import theme from "~/theme";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "~/context";

type LoginFormFields = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const { authMode, setAuthMode } = useAppContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormFields>();

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (signInError) {
      setSignInError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  useEffect(() => {
    if (authMode === "credential") {
      router.push("/");
    }
  }, [authMode, router]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    console.log("==> trigger onSubmit");
    const signInResponse = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInResponse?.ok) {
      setAuthMode?.("credential");
      router.push("/");
    } else {
      setSignInError(true);
    }
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box
        sx={{
          maxWidth: "480px",
          width: "100%",
          py: 10,
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
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  // onKeyDown: handlePasswordKeyDown,
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
            )}
          />
          {signInError && (
            <Alert
              variant="filled"
              severity="error"
              sx={{
                backgroundColor: theme.palette.error.main,
                color: "white",
              }}
            >
              Invalid Credentials
            </Alert>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
