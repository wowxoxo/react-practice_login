import React, { useContext } from "react";

import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./state/auth-context";
import LoginWithContext from "./components/Login/LoginWithContext";
import Card from "./components/UI/Card/Card";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <LoginWithContext />}
        {authCtx.isLoggedIn && <Home />}
        <Card style={{ background: "red" }}>Hello</Card>
        <div style={{ padding: "10px", background: "cyan" }}>Bye</div>
      </main>
    </React.Fragment>
  );
}

export default App;
