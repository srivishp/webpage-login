import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  // getting context from the hook is much cleaner

  const ctx = useContext(AuthContext);

  return (
    // Consumer is used here, as the component that is wrapped will consume the data
    // Consumer needs a child aka object
    // <AuthContext.Consumer>
    //   {(ctx) => {
    //     return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    //     );
    //   }}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
