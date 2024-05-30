import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { DataForAI, QuestionnaireFields } from "~/types";
import {
  calculateTDEE,
  getCaloriesForFitnessGoal,
  stringToArray,
} from "~/utils";
import { mockData } from "./mockData";

interface IAppContext {
  authMode: "credential" | "guest";
  isGenerating: boolean;
  setAuthMode?: (mode: "credential" | "guest") => void;
  setDataSubmitted?: (data: QuestionnaireFields | null) => void;
}

const defaultAppContext: IAppContext = {
  authMode: "guest",
  isGenerating: false,
};

const AppContext = createContext<IAppContext>(defaultAppContext);

interface AppContextProps {
  children: React.ReactNode;
}

const AppContenxtProvider = ({ children }: AppContextProps) => {
  const { data } = useSession();
  const [authMode, setAuthMode] = useState<"credential" | "guest">("guest");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlanGenerated, setMealPlanGenerated] = useState(false);

  const [dataSubmitted, setDataSubmitted] =
    useState<QuestionnaireFields | null>();

  // TODO: remove this block after done testing
  useEffect(() => {
    if (!dataSubmitted) {
      setDataSubmitted(mockData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calculated data
  const [dataForAI, setDataForAI] = useState<DataForAI | null>(null);

  const callGenerator = useCallback(async (input: DataForAI) => {
    setIsGenerating(true);

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();
    console.log("==> ai response", data);

    setMealPlanGenerated(true);
    setIsGenerating(false);
  }, []);

  useEffect(() => {
    if (dataSubmitted && !mealPlanGenerated) {
      console.log("==> dataSubmitted", dataSubmitted);

      const tdee = calculateTDEE(
        dataSubmitted.gender,
        dataSubmitted.age,
        dataSubmitted.weight,
        dataSubmitted.heightFeet,
        dataSubmitted.heightInches,
        dataSubmitted.activity
      );

      const caloriesForFitnessGoal = getCaloriesForFitnessGoal(
        tdee,
        dataSubmitted.fitnessGoal
      );

      const allCantEat = [
        ...stringToArray(dataSubmitted.allergies),
        ...stringToArray(dataSubmitted.avoid),
        ...stringToArray(dataSubmitted.dislikes),
      ].join(",");

      const dataForAI = {
        caloriesForFitnessGoal,
        veganOrVegetarian: dataSubmitted.veganOrVegetarian,
        cantEat: allCantEat,
        preferredProteinSources: dataSubmitted.preferredProteinSources
          .map((item) => item.name)
          .join(","),
        preferredCarbSources: dataSubmitted.preferredCarbSources
          .map((item) => item.name)
          .join(","),
        preferredFatSources: dataSubmitted.preferredFatSources
          .map((item) => item.name)
          .join(","),
        macroNutrientRatio: {
          protein: dataSubmitted.macroProtein,
          carbs: dataSubmitted.macroCarb,
          fat: dataSubmitted.macroFat,
        },
      };

      console.log("==> submitting data to AI", dataForAI);

      setDataForAI(dataForAI);

      void callGenerator(dataForAI);
    }
  }, [callGenerator, dataSubmitted, mealPlanGenerated]);

  useEffect(() => {
    if (data) {
      setAuthMode("credential");
    }
  }, [data]);

  return (
    <AppContext.Provider
      value={{ authMode, isGenerating, setAuthMode, setDataSubmitted }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppContenxtProvider };
