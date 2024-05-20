"use client";

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import type { QuestionComponentProps } from "~/types";

// Gender
// Age
// Weight
// Height
// Activity
// 			Sedentary (little to no exercise): 1.2
// 			Lightly active (light exercise or sports 1-3 days a week): 1.375
// 			Moderately active (moderate exercise or sports 3-5 days a week): 1.55
// 			Very active (hard exercise or sports 6-7 days a week): 1.725
// 			Super active (very hard exercise and a physical job or training twice a day): 1.9

// type QuestionnaireFields = {
//   gender: string;
//   age: number;
//   weight: number;
//   height: number;
//   activity: number;
//   fitnessGoal: "maintain" | "cut" | "bulk";
//   veganOrVegetarian: "vegan" | "vegetarian" | null;
//   allergies: string[];
//   avoid: string[];
//   dislikes: string[];
//   preferredProteinSources: string[];
//   preferredCarbSources: string[];
//   preferredFatSources: string[];
// };

const BasicInformation = ({ formHook }: QuestionComponentProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;

  return (
    <Stack gap={2}>
      <FormControl id="height" sx={{ gap: 1 }}>
        <FormLabel id="height-label" sx={{ color: "white" }}>
          Height
        </FormLabel>
        <Box display="flex" width={1} gap={1}>
          <Controller
            name="heightFeet"
            control={control}
            rules={{
              required: "Height (ft) is required",
              min: {
                value: 0,
                message: "Height (ft) must be greater than or equal to 0",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                aria-labelledby="height-label"
                variant="outlined"
                size="small"
                error={!!errors.heightFeet}
                helperText={errors.heightFeet?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ color: "red" }}>
                      ft
                    </InputAdornment>
                  ),
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
            )}
          />
          <Controller
            name="heightInches"
            control={control}
            rules={{
              required: "Height (inches) is required",
              min: {
                value: 0,
                message: "Height (inches) must be greater than or equal to 0",
              },
              max: {
                value: 11,
                message: "Height (inches) must be less than or equal to 11",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                variant="outlined"
                size="small"
                error={!!errors.heightInches}
                helperText={errors.heightInches?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ color: "red" }}>
                      inches
                    </InputAdornment>
                  ),
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
            )}
          />
        </Box>
      </FormControl>
      <Controller
        name="gender"
        control={control}
        rules={{ required: "Gender is required" }}
        render={({ field }) => (
          <FormControl>
            <FormLabel id="gender-group-label" sx={{ color: "white" }}>
              Gender
            </FormLabel>
            <RadioGroup
              {...field}
              row
              aria-labelledby="gender-group-label"
              name="gender"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        )}
      />
    </Stack>
  );
};

export { BasicInformation };
