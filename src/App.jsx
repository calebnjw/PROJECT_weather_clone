// eslint-disable-next-line quotes
import React, { useState, useEffect } from "react";
import LoginForm from "./pages/login.jsx";
import SignUpForm from "./pages/signup.jsx";
import axios from "axios";

// import components
// import component from './components/component.jsx';

export default function App() {
  const [step, setStep] = useState(1);
  const [signUp, setSignUp] = useState("");

  return (
    <div>
      {step === 1 && <LoginForm setStep={setStep} />}
      {step === 2 && <SignUpForm setStep={setStep} setSignUp={setSignUp} />}
    </div>
  );
}
