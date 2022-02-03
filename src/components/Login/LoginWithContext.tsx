import React, { useContext } from "react";
import AuthContext from "../../state/auth-context";
import Login from "./Login";

const LoginWithContext = () => {
  const authCtx = useContext(AuthContext);
  return <Login onLogin={authCtx.onLogin} />;
};

export default LoginWithContext;
