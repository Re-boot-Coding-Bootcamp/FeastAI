"use client";

import {
  Alert,
  Autocomplete,
  Divider,
  FormControl,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import {
  popularCarbSources,
  popularFatSources,
  popularProteinSources,
} from "~/constants";
import type { QuestionComponentProps } from "~/types";

const PreferredFoodSources = ({ formHook }: QuestionComponentProps) => {
  const {
    control,
    formState: { errors },
    watch,
  } = formHook;

  const total = watch(["macroCarb", "macroProtein", "macroFat"]).reduce(
    (acc, val) => acc + parseInt(`${val || 0}`),
    0
  );

  const message = useMemo(() => {
    switch (true) {
      case total === 100:
        return "Your Macro Percentages looks good!";
      case total < 100:
        return "Your sum of Protein, Fat, and Carb Macro Percentages is less than 100%";
      case total > 100:
        return "Your sum of Protein, Fat, and Carb Macro Percentages is more than 100%";
    }
  }, [total]);

  return (
    <Stack gap={2}>
      <Controller
        name="preferredProteinSources"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ gap: 1 }}>
            <FormLabel
              id="preferredProteinSources-label"
              sx={{ color: "white" }}
            >
              Preferred Protein Sources
            </FormLabel>
            <Autocomplete
              {...field}
              onChange={(e, value) => {
                field.onChange(value);
              }}
              multiple
              options={popularProteinSources}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.type}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select your preferred protein sources"
                />
              )}
            />
          </FormControl>
        )}
      />
      <Controller
        name="preferredCarbSources"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ gap: 1 }}>
            <FormLabel id="preferredCarbSources-label" sx={{ color: "white" }}>
              Preferred Carb Sources
            </FormLabel>
            <Autocomplete
              {...field}
              multiple
              options={popularCarbSources}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.type}
              onChange={(e, value) => {
                field.onChange(value);
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select your preferred carb sources"
                />
              )}
            />
          </FormControl>
        )}
      />
      <Controller
        name="preferredFatSources"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ gap: 1 }}>
            <FormLabel id="preferredFatSources-label" sx={{ color: "white" }}>
              Preferred Fat Sources
            </FormLabel>
            <Autocomplete
              {...field}
              multiple
              options={popularFatSources}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.type}
              filterSelectedOptions
              onChange={(e, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select your preferred protein sources"
                />
              )}
            />
          </FormControl>
        )}
      />

      <Divider />

      <Controller
        name="macroProtein"
        control={control}
        rules={{
          required: "Protein Macro Percentage is required",
          min: {
            value: 0,
            message:
              "Protein Macro Percentage must be greater than or equal to 0",
          },
          max: {
            value: 100,
            message:
              "Protein Macro Percentage must be less than or equal to 100",
          },
        }}
        render={({ field }) => (
          <FormControl id="macroProtein" sx={{ gap: 1 }}>
            <FormLabel id="macroProtein-label" sx={{ color: "white" }}>
              Protein Macro Percentage{" "}
              <Typography component="span" color={red[300]}>
                *
              </Typography>
            </FormLabel>
            <TextField
              {...field}
              type="number"
              aria-labelledby="macroProtein-label"
              variant="outlined"
              size="small"
              error={!!errors.macroProtein}
              helperText={errors.macroProtein?.message}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              sx={{
                flex: 1,
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
          </FormControl>
        )}
      />
      <Controller
        name="macroFat"
        control={control}
        rules={{
          required: "Fat Macro Percentage is required",
          min: {
            value: 0,
            message: "Fat Macro Percentage must be greater than or equal to 0",
          },
          max: {
            value: 100,
            message: "Fat Macro Percentage must be less than or equal to 100",
          },
        }}
        render={({ field }) => (
          <FormControl id="macroFat" sx={{ gap: 1 }}>
            <FormLabel id="macroFat-label" sx={{ color: "white" }}>
              Fat Macro Percentage{" "}
              <Typography component="span" color={red[300]}>
                *
              </Typography>
            </FormLabel>
            <TextField
              {...field}
              type="number"
              aria-labelledby="macroFat-label"
              variant="outlined"
              size="small"
              error={!!errors.macroFat}
              helperText={errors.macroFat?.message}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              sx={{
                flex: 1,
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
          </FormControl>
        )}
      />
      <Controller
        name="macroCarb"
        control={control}
        rules={{
          required: "Carb Macro Percentage is required",
          min: {
            value: 0,
            message: "Carb Macro Percentage must be greater than or equal to 0",
          },
          max: {
            value: 100,
            message: "Carb Macro Percentage must be less than or equal to 100",
          },
        }}
        render={({ field }) => (
          <FormControl id="macroCarb" sx={{ gap: 1 }}>
            <FormLabel id="macroCarb-label" sx={{ color: "white" }}>
              Carb Macro Percentage{" "}
              <Typography component="span" color={red[300]}>
                *
              </Typography>
            </FormLabel>
            <TextField
              {...field}
              type="number"
              aria-labelledby="macroCarb-label"
              variant="outlined"
              size="small"
              error={!!errors.macroCarb}
              helperText={errors.macroCarb?.message}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              sx={{
                flex: 1,
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
          </FormControl>
        )}
      />

      <Alert
        variant="outlined"
        severity={total !== 100 ? "warning" : "success"}
      >
        {message}
      </Alert>
    </Stack>
  );
};

export { PreferredFoodSources };
