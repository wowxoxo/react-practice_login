import React, { useState, useEffect, FC } from "react";

const AuthContext = React.createContext<IAuthCtx>({
  isLoggedIn: false,
  onLogin: (email: string, password: string) => {},
  onLogout: () => {}
});

interface IAuthCtx {
  isLoggedIn: boolean;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
}

export const AuthContextProvider: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email: string, password: string) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const contextValue: IAuthCtx = {
    isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
