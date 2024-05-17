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

const steps = [
  {
    label: "Basic Information",
    content: <>Step 1: Basic Information</>,
    onContinue: () => {
      // Save data to context
    },
  },
  {
    label: "Weight/Fitness Goal",
    content: <>Step 2: Weight/Fitness Goal</>,
    onContinue: () => {
      // Save data to context
    },
  },
  {
    label: "Dietary Preferences",
    content: <>Step 3: Dietary Preferences</>,
    onContinue: () => {
      // Save data to context
    },
  },
  {
    label: "Preferred Food Sources",
    content: <>Step 4: Preferred Food Sources</>,
    onContinue: () => {
      // Save data to context
    },
  },
];

export default function QuestionsPage() {
  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = activeStep === steps.length - 1;
  const allStepsCompleted = activeStep === steps.length;

  const handleNextClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
          display: "flex",
          justifyContent: "center",
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
            sx={{ flexGrow: { xs: 1, md: 0 } }}
          >
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </Box>
      )}
    </Stack>
  );
}
