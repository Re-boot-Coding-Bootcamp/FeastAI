"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  BasicInformation,
  DietaryPreferences,
  PreferredFoodSources,
  WeightAndFitnessGoal,
} from "~/components";
import type { QuestionnaireFields } from "~/types";

export default function QuestionsPage() {
  const [activeStep, setActiveStep] = useState(0);

  const formHook = useForm<QuestionnaireFields>({
    mode: "onTouched",
    defaultValues: {
      gender: "female",
      activity: -1,
      veganOrVegetarian: "neither",
    },
  });

  const step1Valid =
    formHook
      .watch([
        "activity",
        "age",
        "heightFeet",
        "heightInches",
        "weight",
        "gender",
      ])
      .filter((val) => !val || val === -1).length === 0;

  const step2Valid = !!formHook.watch("fitnessGoal");

  const checkStepValied = (step: number) => {
    switch (step) {
      case 0:
        return step1Valid;
      case 1:
        return step2Valid;
      case 2:
        return true;
      case 3:
        return false;
    }
  };

  const steps = [
    {
      label: "Basic Information",
      content: <BasicInformation formHook={formHook} />,
      onContinue: () => {
        // Save data to context
      },
    },
    {
      label: "Weight/Fitness Goal",
      content: <WeightAndFitnessGoal formHook={formHook} />,
      onContinue: () => {
        // Save data to context
      },
    },
    {
      label: "Dietary Preferences",
      content: <DietaryPreferences formHook={formHook} />,
      onContinue: () => {
        // Save data to context
      },
    },
    {
      label: "Preferred Food Sources",
      content: <PreferredFoodSources formHook={formHook} />,
      onContinue: () => {
        // Save data to context
      },
    },
  ];

  /* STEP LOGIC */
  const isLastStep = activeStep === steps.length - 1;
  const allStepsCompleted = activeStep === steps.length;

  const handleNextClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  /* STEP LOGIC */

  return (
    <Stack
      pt={4}
      px={2}
      gap={2}
      sx={{
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper
        sx={{
          p: 2,
        }}
      >
        {allStepsCompleted ? (
          <>{`You're all done!`}</>
        ) : (
          steps[activeStep]?.content
        )}
      </Paper>
      {!allStepsCompleted && (
        <Box display="flex" justifyContent="flex-end" gap={1}>
          {activeStep > 0 && (
            <Button
              onClick={handleBackClick}
              variant="outlined"
              sx={{ flexGrow: { xs: 1, md: 0 } }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNextClick}
            variant="contained"
            disabled={!checkStepValied(activeStep)}
            sx={{ flexGrow: { xs: 1, md: 0 } }}
          >
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </Box>
      )}
    </Stack>
  );
}
