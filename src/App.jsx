import React, { useState, useEffect } from "react";
// * useEffect hook has two arguments (()=>{}, [dependencies])
// It is used to change values (call the function) only if dependencies are changed
// but not when page is reloaded

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // change in state may cause multiple re-runs of code
  // but code inside useEffect function will run only once

  useEffect(() => {
    // getItem is used here
    const userLoginInfo = localStorage.getItem("isLoggedIn");
    if (userLoginInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  // TODO: useEffect is helpful to keep users logged in, even if they refresh the page
  // ! Setting localStorage in useEffect also avoids infinite loops

  const loginHandler = (email, password) => {
    // localStorage is a built in read-only property, and it helps store data in the browser
    // setItem is used here
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    // clearing the stored value on logout
    // or else, refreshing will log you back in
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
