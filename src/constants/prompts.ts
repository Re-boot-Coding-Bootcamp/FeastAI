import type { DataForAI } from "~/types";

const CHUNK_ONE = `
You are a professional nutritionist tasked with creating a customized weekly meal plan for a client based on the following information:
1. Calories Required for Fitness Goal: [Calories required to achieve the fitness goal].
2. Diet Type: [Vegan/Vegetarian/Non-specified].
3. Preferred Protein Sources: [List of preferred protein sources].
4. Preferred Carb Sources: [List of preferred carb sources].
5. Preferred Fat Sources: [List of preferred fat sources].
6. Dietary Restrictions: [List of things the user cannot eat due to allergies, religion, or other reasons].
7. Macronutrient Distribution: [Preferred percentages for carbs, fats, and proteins, e.g., 40% fat, 40% protein, 20% carbs].

Based on this information, generate a detailed meal plan for one week. The meal plan should include:
- Daily caloric intake total must match client's Calories Required for Fitness Goal. +/- 100 calories is acceptable.
- Three main meals (breakfast, lunch, dinner) and two snacks per day.
- Specific food items for each meal that align with the client's dietary preferences and restrictions.
- Nutritional breakdown for each meal and snack, including the amount of calories, protein, carbs, and fats.
- Precise calorie calculations based on macronutrient values (4 calories per gram of protein and carbohydrates, 9 calories per gram of fats).
- Variety in the meals across the week to ensure the client does not get bored with repetitive foods.
- Preparation tips or simple recipes for each meal.
`;

const CHUNK_TWO = (data: DataForAI) => {
  const {
    caloriesForFitnessGoal,
    veganOrVegetarian,
    cantEat,
    preferredProteinSources,
    preferredCarbSources,
    preferredFatSources,
    macroNutrientRatio,
  } = data;

  return `
Ensure that the meal plan is balanced, nutritious, and feasible for the client to follow. Here's the data for the client:
1. Calories Required for Fitness Goal:: ${caloriesForFitnessGoal} calories.
2. Diet Type: ${veganOrVegetarian}
3. Preferred Protein Sources: ${preferredProteinSources}
4. Preferred Carb Sources: ${preferredCarbSources}
5. Preferred Fat Sources: ${preferredFatSources}
6. Dietary Restrictions: ${cantEat}
7. Macronutrient Distribution: ${macroNutrientRatio.protein}% protein, ${macroNutrientRatio.carbs}% carbs, ${macroNutrientRatio.fat}% fat.
`;
};

const CHUNK_THREE = `
Format the meal plan as follows:

- Start with a divider line: '---------------------'
- Use the format 'Day X:'
- For each day, list the meals and snacks in this format:
  - 'Meal: [Meal Name]'
  - 'Items: [Food Items]'
  - 'Calories: [Calories]'
  - 'Protein: [Protein]'
  - 'Carbs: [Carbs]'
  - 'Fats: [Fats]'
  - 'Recipe: [Simple Recipe or Preparation Tips]'
- Separate each meal and snack with a double newline for clarity.
- For each day, calculate and display the total calories, and ensure the total calories match the client's Calories Required for Fitness Goal.
- No summary/conclusion/note is needed.
- End the meal plan with a divider line: '---------------------'

Generate the meal plan accordingly.
`;

export { CHUNK_ONE, CHUNK_TWO, CHUNK_THREE };
