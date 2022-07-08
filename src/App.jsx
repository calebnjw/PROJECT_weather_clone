import React, { useState, useEffect } from 'react';
import LoginForm from './pages/login.jsx';
import SignUpForm from './pages/signup.jsx';
import axios from 'axios';

// import components
// import component from './components/component.jsx';

export default function App() {
  const [step, setStep] = useState(2);

  return (
    <div>
      {step === 1 && <LoginForm setStep={setStep}/>}
      {step === 2 && <SignUpForm setStep={setStep}/>}
    </div>
  );
}
