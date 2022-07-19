import React, { useState, useEffect } from "react";

const FavouritePage = (props) => {
  const { setStep } = props;

  const handleLogout = () => {
    //go back to home(login page)
    setStep(1);
    try {
        localStorage.removeItem("token");
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <>
      <div>This is our weather favourite page</div>

      <div
        className="ui teal big submit button"
        onClick={handleLogout}
      >
        <i className="sign-out icon"></i>
        Logout
      </div>
    </>
  );
};

export default FavouritePage;
