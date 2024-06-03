const calculateTDEE = (
  gender: string,
  age: number,
  weight: number,
  heightFeet: number,
  heightInches: number,
  activity: number
): number => {
  const heightInCm = heightFeet * 30.48 + heightInches * 2.54;
  const weightInKg = weight / 2.205;

  let bmr;

  if (gender === "male") {
    bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * age;
  }

  const tdee = bmr * activity;

  return Math.floor(tdee);
};

const getCaloriesForFitnessGoal = (tdee: number, goal: string): number => {
  if (goal === "cutting") {
    return tdee - 500;
  } else if (goal === "bulking") {
    return tdee + 500;
  } else {
    return tdee;
  }
};

const stringToArray = (input: string) => {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
};

export { getCaloriesForFitnessGoal, calculateTDEE, stringToArray };
