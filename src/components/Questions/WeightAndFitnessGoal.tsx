"use client";

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller } from "react-hook-form";
import type { QuestionComponentProps } from "~/types";

import theme from "~/theme";
import { red } from "@mui/material/colors";

const WeightAndFitnessGoal = ({ formHook }: QuestionComponentProps) => {
  const { control } = formHook;
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const radioOptions = [
    {
      value: "bulking",
      label: "Bulk",
      image: "https://murad-public-files.s3.amazonaws.com/feast-ai/bulk.png",
    },
    {
      value: "cutting",
      label: "Cut",
      image: "https://murad-public-files.s3.amazonaws.com/feast-ai/cut.png",
    },
    {
      value: "maintain",
      label: "Maintain",
      image:
        "https://murad-public-files.s3.amazonaws.com/feast-ai/maintain.png",
    },
  ];

  return (
    <Stack>
      <Controller
        name="fitnessGoal"
        control={control}
        rules={{ required: "Fitness Goal is required" }}
        render={({ field }) => (
          <FormControl>
            <FormLabel id="fitness-goal-group-label" sx={{ color: "white" }}>
              Fitness Goal{" "}
              <Typography component="span" color={red[300]}>
                *
              </Typography>
            </FormLabel>
            <RadioGroup
              {...field}
              row
              aria-labelledby="fitness-goal-group-label"
              name="gender"
              sx={{
                justifyContent: isLargeScreen ? "space-around" : "center",
                alignItems: "center",
                mt: 2,
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              {radioOptions.map((option) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box
                        display="flex"
                        flexDirection={isLargeScreen ? "column" : "row"}
                        alignItems="center"
                        gap={1}
                      >
                        <Box order={2}>
                          <Image
                            src={option.image}
                            alt={`${option.value}-illustration`}
                            height={isLargeScreen ? 130 : 200}
                            width={isLargeScreen ? 130 : 200}
                          />
                        </Box>
                        <Typography
                          variant="body1"
                          order={1}
                          width={isLargeScreen ? "unset" : "72px"}
                          color={
                            field.value === option.value ? "primary" : "inherit"
                          }
                        >
                          {option.label}
                        </Typography>
                      </Box>
                    }
                    labelPlacement={isLargeScreen ? "top" : "end"}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        )}
      />
    </Stack>
  );
};

export { WeightAndFitnessGoal };
