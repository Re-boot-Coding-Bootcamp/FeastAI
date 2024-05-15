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
import Image from "next/image";

import Logo from "~/assets/feast-ai-logo.png";

type LoginFormFields = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const { setAuthMode } = useAppContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
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

  const handleGuestSignIn = () => {
    setAuthMode?.("guest");
    router.push("/");
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box m={4}>
        <Image src={Logo} alt="logo" height={66} width={66} />
      </Box>
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
              // pattern: {
              //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              //   message: "Invalid password",
              // },
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
          <Button variant="outlined" onClick={handleGuestSignIn}>
            Continue as Guest
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
