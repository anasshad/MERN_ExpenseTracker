import React from "react";
import { Grid } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Route components
import App from "./components/MainApp";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Home from "./components/Home";

//Import context provider
import { GlobalProvider } from "./context/GlobalState";

export default () => {
  return (
    <GlobalProvider>
      <Router>
        <Grid container direction="column" alignItems="center">
          <Grid item sm={12} md={3}>
            <Header />
            <div className="Container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <PrivateRoute
                  redirectLink="/login"
                  path="/app"
                  component={App}
                />
              </Routes>
            </div>
          </Grid>
        </Grid>
      </Router>
    </GlobalProvider>
  );
};
