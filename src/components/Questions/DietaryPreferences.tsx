"use client";

import React from "react";
import type { QuestionComponentProps } from "~/types";

// Dietary Preference
// 		Are you vegetarian or vegan?
// 			This helps to determine if animal products like meat, dairy, and eggs are acceptable in the diet.
// 		Do you have any food allergies or intolerances?
// 			It's important to know if someone has allergies or intolerances to common ingredients like nuts, gluten, dairy, etc., to avoid any adverse reactions.
// 		Do you avoid certain foods for cultural or religious reasons?
// 			Some individuals avoid specific foods due to cultural or religious beliefs, such as pork, beef, or certain spices.
// 		Are there any foods you strongly dislike or refuse to eat?
// 			Knowing someone's food aversions can help avoid including those ingredients in their meals.

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

const DietaryPreferences = ({ formHook }: QuestionComponentProps) => {
  return <div>DietaryPreferences</div>;
};

export { DietaryPreferences };
