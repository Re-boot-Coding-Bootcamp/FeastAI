"use client";

import {
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
    watch,
    control,
    formState: { errors },
  } = formHook;

  const gender = watch("gender");

  console.log("==> gender", gender);

  return (
    <Stack>
      <Controller
        name="height"
        control={control}
        rules={{ required: "Height is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Height"
            variant="outlined"
            error={!!errors.weight}
            helperText={errors.weight?.message}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: "red" }}>
                  ft
                </InputAdornment>
              ),
            }}
            sx={{
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
            }}
          />
        )}
      />
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
