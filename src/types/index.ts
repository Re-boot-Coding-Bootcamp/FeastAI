import type { UseFormReturn } from "react-hook-form";

export type QuestionnaireFields = {
  gender: string;
  age: number;
  weight: number;
  height: number;
  activity: number;
  fitnessGoal: string;
  veganOrVegetarian: string;
  allergies: string[];
  avoid: string[];
  dislikes: string[];
  preferredProteinSources: string[];
  preferredCarbSources: string[];
  preferredFatSources: string[];
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
