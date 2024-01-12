import React, { useState } from "react";
import { LoginContainer, LoginForm, RegForm, ResetPW } from "../components";

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");

  const showLoginForm = () => setActiveForm("login");
  const showRegForm = () => setActiveForm("register");
  const showResetPWForm = () => setActiveForm("reset");

  return (
    <div className="min-h-screen bg-primary1">
      <div className={activeForm === "login" ? "" : "hidden"}>
        {/*Login*/}
        <LoginContainer LoginSpace={"30vh"} LoginHeight={"70vh"}>
          <LoginForm
            onRegisterClick={showRegForm}
            onResetClick={showResetPWForm}
          />
        </LoginContainer>
      </div>

      <div className={activeForm === "register" ? "" : "hidden"}>
        {/*Register*/}
        <LoginContainer LoginSpace={"10vh"} LoginHeight={"90vh"}>
          <RegForm onBackClick={showLoginForm} />
        </LoginContainer>
      </div>

      <div className={activeForm === "reset" ? "" : "hidden"}>
        {/*ForgotPW*/}
        <LoginContainer LoginSpace={"30vh"} LoginHeight={"70vh"}>
          <ResetPW onBackClick={showLoginForm} />
        </LoginContainer>
      </div>
    </div>
  );
};

export default Login;
