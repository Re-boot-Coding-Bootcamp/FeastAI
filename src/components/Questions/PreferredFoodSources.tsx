"use client";

import {
  Autocomplete,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import {
  popularCarbSources,
  popularFatSources,
  popularProteinSources,
} from "~/constants";
import type { QuestionComponentProps } from "~/types";

const PreferredFoodSources = ({ formHook }: QuestionComponentProps) => {
  const { control } = formHook;

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
    </Stack>
  );
};

export { PreferredFoodSources };
