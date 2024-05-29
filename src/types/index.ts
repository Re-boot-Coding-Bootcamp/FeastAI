import type { UseFormReturn } from "react-hook-form";

export type QuestionnaireFields = {
  gender: string;
  age: number;
  weight: number;
  heightFeet: number;
  heightInches: number;
  activity: number;
  fitnessGoal: string;
  veganOrVegetarian: string;
  allergies: string;
  avoid: string;
  dislikes: string;
  preferredProteinSources: {
    name: string;
    type: string;
  }[];
  preferredCarbSources: {
    name: string;
    type: string;
  }[];
  preferredFatSources: {
    name: string;
    type: string;
  }[];
};

export type DataForAI = {
  tdee: number;
  caloriesForFitnessGoal: number;
  veganOrVegetarian: string;
  cantEat: string;
  preferredProteinSources: string;
  preferredCarbSources: string;
  preferredFatSources: string;
};

export type QuestionsFormHook = UseFormReturn<
  QuestionnaireFields,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  undefined
>;

export interface QuestionComponentProps {
  formHook: QuestionsFormHook;
}
