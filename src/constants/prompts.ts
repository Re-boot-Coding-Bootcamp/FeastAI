import type { DataForAI } from "~/types";

const getMealPlanPrompt = (data: DataForAI) => {
  const {
    veganOrVegetarian,
    cantEat,
    preferredProteinSources,
    preferredCarbSources,
    preferredFatSources,
    macroNutrient,
  } = data;

  return `
You are a professional nutritionist tasked with creating a customized weekly meal plan for a client based on the following information:
1. Macronutrient Distribution: ${macroNutrient.protein} grams of protein, ${macroNutrient.carbs} grams of carbs, ${macroNutrient.fat} grams of fat.
2. Diet Type: ${veganOrVegetarian}
3. Preferred Protein Sources: ${preferredProteinSources}
4. Preferred Carb Sources: ${preferredCarbSources}
5. Preferred Fat Sources: ${preferredFatSources}
6. Dietary Restrictions: ${cantEat}

Based on this information, generate a detailed meal plan for one week. The meal plan should include:
- Total daily amount of macronutrients (protein, carbs, fats) **must match** the client's Macronutrient Distribution. +/- 5 grams is acceptable for each macronutrient.
- Daily total caloric intake should be precisely calculated and match the client's target calories based on the provided macronutrient distribution.
- Three main meals (breakfast, lunch, dinner) and two snacks per day.
- Specific food items for each meal that align with the client's dietary preferences and restrictions.
- Nutritional breakdown for each meal and snack, including the amount of calories, protein, carbs, and fats.
- Precise calorie calculations based on macronutrient values. (4 calories per gram of protein and carbohydrates, 9 calories per gram of fats).
- Variety in the meals across the week to ensure the client does not get bored with repetitive foods.
- Preparation tips or simple recipes for each meal.
- Ensure the total daily calories and macronutrients match the target values specified. Increse portion sizes when needed to ensure meeting the target values.

Format the meal plan as follows:
- Use the format 'Day X:'
- For each day, list the meals and snacks in this format:
  - 'Meal: [Meal Name]'
  - 'Items: [Food Items]'
  - 'Calories: [Calories]'
  - 'Protein: [Protein grams]'
  - 'Carbs: [Carbs grams]'
  - 'Fats: [Fats grams]'
  - 'Recipe: [Simple Recipe or Preparation Tips]'
- Separate each meal and snack with a double newline for clarity.
- For each day, display the total daily macronutrient breakdown at the end.
- Ensure the total daily macronutrient and calorie values match the target values specified. +/- 5 grams for each macronutrient is acceptable.
- No summary/conclusion/note is needed.

Generate the meal plan accordingly.
`;
};

export { getMealPlanPrompt };
