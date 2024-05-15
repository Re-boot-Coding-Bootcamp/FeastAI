import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface IAppContext {
  authMode: "credential" | "guest";
  setAuthMode?: (mode: "credential" | "guest") => void;
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

  useEffect(() => {
    if (data) {
      setAuthMode("credential");
    }
  }, [data]);

  return (
    <AppContext.Provider value={{ authMode, setAuthMode }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppContenxtProvider };
