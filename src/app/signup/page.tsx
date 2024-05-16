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

import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

type SignUpFormFields = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmpassword: string;
};

// TODO: Move these to a constants file
const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const USERNAME_REGEX = /^[\w]*$/;

export default function SignUpPage() {
  const { mutateAsync: createAccount } = api.account.create.useMutation();
  const { mutateAsync: checkIfUsernameExists } =
    api.account.checkIfUsernameExists.useMutation();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm<SignUpFormFields>({
    mode: "onTouched",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    try {
      const result = await checkIfUsernameExists({
        username: data.username,
        email: data.email,
      });

      if (result.exists) {
        if (result.byEmail) {
          setError("email", {
            message: "Email is already taken",
          });
        }

        if (result.byUsername) {
          setError("username", {
            message: "Username is already taken",
          });
        }

        return;
      }

      await createAccount(data);
      // TODO: snackbar.success("Account created successfully");
      router.push("/signin");
    } catch {
      // TODO: snackbar.error("An error occurred. Please try again.");
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
            Create a Feast AI account
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Already have an account?</Typography>
            <Typography
              component={Link}
              href={"/signin"}
              sx={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign In
            </Typography>
          </Box>
          <Controller
            name="firstname"
            control={control}
            rules={{ required: "First Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{ required: "Last Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Invalid email" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username is required",
              validate: {
                maxLength: (value) =>
                  value.length <= 20 ||
                  "Username can't be more than 20 characters",
                onlyCharacters: (value) =>
                  USERNAME_REGEX.test(value) ||
                  "Username must contain only letters, numbers, or underscores",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              validate: {
                minLength: (value) =>
                  value.length >= 8 || "Password must be at least 8 characters",
                maxLength: (value) =>
                  value.length <= 20 ||
                  "Password can't be more than 20 characters",
                oneUpperCase: (value) =>
                  !!value?.match(/[A-Z]/)?.length ||
                  "Password must contain at least one uppercase letter",
                oneLowerCase: (value) =>
                  !!value?.match(/[a-z]/)?.length ||
                  "Password must contain at least one lowercase letter",
                oneSpecialCharacter: (value) =>
                  !!value.match(/[\W]/)?.length ||
                  "Password must contain at least one special character",
                oneDigit: (value) =>
                  !!value?.match(/[0-9]/)?.length ||
                  "Password must contain at least one digit",
              },
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
          <Controller
            name="confirmpassword"
            control={control}
            rules={{
              required: "Confirm Password is required",
              validate: {
                passwordsMatch: (value) => {
                  return (
                    value === watch("password") || "Passwords do not match"
                  );
                },
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                error={!!errors.confirmpassword}
                helperText={errors.confirmpassword?.message}
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
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
