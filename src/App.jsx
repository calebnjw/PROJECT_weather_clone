import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './pages/login.jsx';
import SignUpForm from './pages/signup.jsx';
import FavouritePage from './pages/favouritePage.jsx';
// import weather from './SnowFlake.gif';

// import components
// import component from './components/component.jsx';

export default function App() {
  const [step, setStep] = useState(1);
  const [signUp, setSignUp] = useState('');
  const [login, setLogin] = useState('');

  return (
    <div>
      {step === 1 && <LoginForm setStep={setStep} setLogin={setLogin}/>}
      {step === 2 && <SignUpForm setStep={setStep} setSignUp={setSignUp}/>}
      {step === 3 && <FavouritePage setStep={setStep}/>}
    </div>
  );
}
