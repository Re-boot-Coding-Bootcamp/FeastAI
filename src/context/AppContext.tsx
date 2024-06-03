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
import { api } from "~/trpc/react";
import { enqueueSnackbar } from "notistack";

interface IAppContext {
  dataForAI: DataForAI | null;
  mealPlan: string | null;
  authMode: "credential" | "guest";
  isGenerating: boolean;
  setAuthMode?: (mode: "credential" | "guest") => void;
  setDataSubmitted?: (data: QuestionnaireFields | null) => void;
}

const defaultAppContext: IAppContext = {
  dataForAI: null,
  mealPlan: null,
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
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [dataSubmitted, setDataSubmitted] =
    useState<QuestionnaireFields | null>();
  const [dataForAI, setDataForAI] = useState<DataForAI | null>(null);

  const { mutateAsync: saveMealPlan } = api.mealPlan.create.useMutation();
  const { data: existingMealPlan } = api.mealPlan.get.useQuery(undefined, {
    enabled: authMode === "credential",
  });

  const callGenerator = useCallback(
    async (input: DataForAI) => {
      setIsGenerating(true);

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const { content } = (await response.json()) as { content: string };

      if (authMode === "credential") {
        try {
          await saveMealPlan({ content });
        } catch {
          enqueueSnackbar("Failed to save meal plan", { variant: "error" });
        }
      }

      setMealPlan(content);
      setMealPlanGenerated(true);
      setIsGenerating(false);
    },
    [authMode, saveMealPlan]
  );

  useEffect(() => {
    if (dataSubmitted && !mealPlanGenerated && !mealPlan) {
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
        macroNutrient: {
          protein:
            (caloriesForFitnessGoal * (dataSubmitted.macroProtein / 100)) / 4,
          carbs: (caloriesForFitnessGoal * (dataSubmitted.macroCarb / 100)) / 4,
          fat: (caloriesForFitnessGoal * (dataSubmitted.macroFat / 100)) / 9,
        },
      };

      setDataForAI(dataForAI);

      void callGenerator(dataForAI);
    }
  }, [callGenerator, dataSubmitted, mealPlan, mealPlanGenerated]);

  useEffect(() => {
    if (data) {
      setAuthMode("credential");
    }
  }, [data]);

  useEffect(() => {
    if (existingMealPlan && !mealPlan) {
      setMealPlan(existingMealPlan.content);
    }
  }, [existingMealPlan, mealPlan]);

  return (
    <AppContext.Provider
      value={{
        mealPlan,
        dataForAI,
        authMode,
        isGenerating,
        setAuthMode,
        setDataSubmitted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppContenxtProvider };
