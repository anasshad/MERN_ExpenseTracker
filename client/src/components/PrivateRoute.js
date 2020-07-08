import React from "react";
import { Navigate, Route } from "react-router-dom";
import cookie from "react-cookies";

const Container = ({ Component, redirectLink, ...props }) => {
  if (!cookie.load("auth-token")) {
    return <Navigate to={redirectLink} />;
  }

  return <Component {...props} />;
};

const PrivateRoute = ({ component, redirectLink, path, ...props }) => {
  return (
    <Route
      path={path}
      element={
        <Container
          Component={component}
          redirectLink={redirectLink}
          {...props}
        />
      }
    />
  );
};

export default PrivateRoute;
