import { createContext, useContext, useState } from "react";

interface IAppContext {
  authMode: "credential" | "guest" | null;
  setAuthMode?: (mode: "credential" | "guest" | null) => void;
}

const defaultAppContext: IAppContext = {
  authMode: null,
};

const AppContext = createContext<IAppContext>(defaultAppContext);

interface AppContextProps {
  children: React.ReactNode;
}

const AppContenxtProvider = ({ children }: AppContextProps) => {
  const [authMode, setAuthMode] = useState<"credential" | "guest" | null>(null);

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
