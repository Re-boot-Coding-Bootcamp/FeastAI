"use client";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import type { QuestionComponentProps } from "~/types";

const DietaryPreferences = ({ formHook }: QuestionComponentProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;

  return (
    <Stack gap={2}>
      <Controller
        name="veganOrVegetarian"
        control={control}
        rules={{ required: "Vegetarian or Vegan selection is required" }}
        render={({ field }) => (
          <FormControl>
            <FormLabel
              id="vegetarian-or-vegan-group-label"
              sx={{ color: "white" }}
            >
              Are you vegetarian or vegan?
            </FormLabel>
            <RadioGroup
              {...field}
              row
              aria-labelledby="vegetarian-or-vegan-group-label"
            >
              <FormControlLabel
                value="vegan"
                control={<Radio />}
                label="Vegan"
              />
              <FormControlLabel
                value="vegetarian"
                control={<Radio />}
                label="Vegetarian"
              />
              <FormControlLabel
                value="non-specified"
                control={<Radio />}
                label="Neither"
              />
            </RadioGroup>
          </FormControl>
        )}
      />
      <Controller
        name="allergies"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ gap: 1 }}>
            <FormLabel id="allergies-label" sx={{ color: "white" }}>
              Do you have any food allergies or intolerances?
            </FormLabel>
            <TextField
              {...field}
              type="text"
              multiline
              maxRows={3}
              aria-labelledby="allergies-label"
              variant="outlined"
              size="small"
              error={!!errors.allergies}
              helperText={errors.allergies?.message}
              placeholder="List any food allergies or intolerances, comma separated. For example: peanuts, gluten, dairy"
            />
          </FormControl>
        )}
      />
      <Controller
        name="avoid"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ gap: 1 }}>
            <FormLabel id="avoid-label" sx={{ color: "white" }}>
              Do you avoid certain foods for cultural or religious reasons?
            </FormLabel>
            <TextField
              {...field}
              type="text"
              multiline
              maxRows={3}
              aria-labelledby="avoid-label"
              variant="outlined"
              size="small"
              error={!!errors.avoid}
              helperText={errors.avoid?.message}
              placeholder="List any foods you avoid for cultural or religious reasons, comma separated. For example: pork, beef, shellfish, certain spices"
            />
          </FormControl>
        )}
      />
      <Controller
        name="dislikes"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ gap: 1 }}>
            <FormLabel id="dislikes-label" sx={{ color: "white" }}>
              Are there any foods you strongly dislike or refuse to eat?
            </FormLabel>
            <TextField
              {...field}
              type="text"
              multiline
              maxRows={3}
              aria-labelledby="dislikes-label"
              variant="outlined"
              size="small"
              error={!!errors.dislikes}
              helperText={errors.dislikes?.message}
              placeholder="List any foods you dislike or refuse to eat, comma separated. For example: mushrooms, olives, cilantro"
            />
          </FormControl>
        )}
      />
    </Stack>
  );
};

export { DietaryPreferences };
