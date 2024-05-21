"use client";

import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import type { QuestionComponentProps } from "~/types";

const ACTIVITY_LEVELS = [
  { label: "Select your activity level", value: -1 },
  { label: "Sedentary (little to no exercise)", value: 1.2 },
  {
    label: "Lightly active (light exercise or sports 1-3 days a week)",
    value: 1.375,
  },
  {
    label: "Moderately active (moderate exercise or sports 3-5 days a week)",
    value: 1.55,
  },
  {
    label: "Very active (hard exercise or sports 6-7 days a week)",
    value: 1.725,
  },
  {
    label:
      "Super active (very hard exercise and a physical job or training twice a day)",
    value: 1.9,
  },
];

const BasicInformation = ({ formHook }: QuestionComponentProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;

  return (
    <Stack gap={2}>
      <Controller
        name="weight"
        control={control}
        rules={{
          required: "Weight is required",
          min: {
            value: 0,
            message: "Weight must be greater than or equal to 0",
          },
        }}
        render={({ field }) => (
          <FormControl id="weight" sx={{ gap: 1 }}>
            <FormLabel id="weight-label" sx={{ color: "white" }}>
              Weight
            </FormLabel>
            <TextField
              {...field}
              type="number"
              aria-labelledby="weight-label"
              variant="outlined"
              size="small"
              error={!!errors.weight}
              helperText={errors.weight?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: "red" }}>
                    lbs
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
          </FormControl>
        )}
      />
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
        name="age"
        control={control}
        rules={{
          required: "Age is required",
          min: {
            value: 1,
            message: "Age must be greater than or equal to 1",
          },
        }}
        render={({ field }) => (
          <FormControl id="age" sx={{ gap: 1 }}>
            <FormLabel id="age-label" sx={{ color: "white" }}>
              Age
            </FormLabel>
            <TextField
              {...field}
              type="number"
              aria-labelledby="age-label"
              variant="outlined"
              size="small"
              error={!!errors.age}
              helperText={errors.age?.message}
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
      <Controller
        name="activity"
        control={control}
        rules={{
          required: "Activity level is required",
          min: {
            value: 0,
            message: "Activity level is required",
          },
        }}
        render={({ field }) => (
          <FormControl id="activity-level" sx={{ gap: 1 }}>
            <FormLabel id="activity-level-label" sx={{ color: "white" }}>
              Acvitity Level
            </FormLabel>
            <Box width={1}>
              <Select
                {...field}
                labelId="activity-level-label"
                size="small"
                error={!!errors.activity}
                sx={{ width: 1 }}
              >
                {ACTIVITY_LEVELS.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {errors.activity?.message && (
                <FormHelperText error={true}>
                  {errors.activity?.message}
                </FormHelperText>
              )}
            </Box>
          </FormControl>
        )}
      />
    </Stack>
  );
};

export { BasicInformation };
