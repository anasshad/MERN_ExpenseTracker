import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  CircularProgress,
  Paper
} from "@material-ui/core";
import { Navigate } from "react-router-dom";
import Joi from "@hapi/joi";
import { GlobalContext } from "../context/GlobalState";

const schema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  })
});

const Login = () => {
  const { login, loading, loggedIn, loginError } = useContext(GlobalContext);
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    const buffer = {};
    buffer[name] = value;
    setValues({
      ...values,
      ...buffer
    });
  };

  const handleClick = async () => {
    console.log(loggedIn);
    const { error } = schema.validate(values, { abortEarly: false });
    let buffer = {
      email: "",
      password: ""
    };
    if (!error) {
      login(values);
    } else {
      error.details.map(detail => (buffer[detail.path[0]] = detail.message));
    }
    setErrors(buffer);
  };

  return (
    <div className="Login" style={{ display: "flex", flexDirection: "column" }}>
      <div className="Component-Header">Login</div>
      <Typography
        style={{ marginTop: "20px" }}
        variant="caption"
        color={!errors.email ? "inherit" : "error"}
      >
        Email
      </Typography>
      <TextField
        name="email"
        variant="outlined"
        size="small"
        onChange={handleChange}
        value={values.email}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Typography
        style={{ marginTop: "20px" }}
        variant="caption"
        color={!errors.password ? "inherit" : "error"}
      >
        Password
      </Typography>
      <TextField
        name="password"
        variant="outlined"
        size="small"
        onChange={handleChange}
        value={values.password}
        type="password"
        error={!!errors.password}
        helperText={errors.password}
      />
      <div style={{ alignSelf: "center", alignItems: "center" }}>
        {!loading ? (
          <button className="Button" onClick={() => handleClick()}>
            Login
          </button>
        ) : (
          <CircularProgress />
        )}
      </div>
      {loggedIn && <Navigate to="/app" />}
      {loginError && (
        <Paper
          variant="outlined"
          style={{
            backgroundColor: "rgba(255,0,0, 0.1)",
            color: "rgba(255,0,0,0.7)",
            borderColor: "rgba(255,0,0,0.7)",
            padding: "20px"
          }}
        >
          <Typography variant="caption">{loginError}</Typography>
        </Paper>
      )}
    </div>
  );
};

export default Login;
