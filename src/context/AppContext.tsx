import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import type { QuestionnaireFields } from "~/types";

interface IAppContext {
  authMode: "credential" | "guest";
  setAuthMode?: (mode: "credential" | "guest") => void;
  setDataSubmitted?: (data: QuestionnaireFields | null) => void;
}

const defaultAppContext: IAppContext = {
  authMode: "guest",
};

const AppContext = createContext<IAppContext>(defaultAppContext);

interface AppContextProps {
  children: React.ReactNode;
}

const AppContenxtProvider = ({ children }: AppContextProps) => {
  const { data } = useSession();
  const [authMode, setAuthMode] = useState<"credential" | "guest">("guest");
  const [dataSubmitted, setDataSubmitted] =
    useState<QuestionnaireFields | null>(null);

  useEffect(() => {
    if (dataSubmitted) {
      console.log("==> Data Received", dataSubmitted);
      // call API to generate meal plan
    }
  }, [dataSubmitted]);

  useEffect(() => {
    if (data) {
      setAuthMode("credential");
    }
  }, [data]);

  return (
    <AppContext.Provider value={{ authMode, setAuthMode, setDataSubmitted }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppContenxtProvider };
