import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  CircularProgress,
  Paper
} from "@material-ui/core";
import Joi from "@hapi/joi";
import { GlobalContext } from "../context/GlobalState";

const schema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  })
});

const Register = () => {
  const { register, loading, registered, registrationError } = useContext(
    GlobalContext
  );
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    let buffer = {};
    buffer[name] = value;
    setValues({
      ...values,
      ...buffer
    });
  };

  const handleClick = async () => {
    const { error } = schema.validate(values, { abortEarly: false });
    let buffer = {
      name: "",
      email: "",
      password: ""
    };
    if (!error) {
      register(values);
    } else {
      error.details.map(detail => (buffer[detail.path[0]] = detail.message));
    }
    setErrors(buffer);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="Component-Header">Register</div>
      <Typography
        style={{ marginTop: "20px" }}
        variant="caption"
        color={!errors.name ? "inherit" : "error"}
      >
        Name
      </Typography>
      <TextField
        name="name"
        variant="outlined"
        size="small"
        onChange={handleChange}
        value={values.name}
        error={!!errors.name}
        helperText={errors.name}
      />
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
      {loading ? (
        <CircularProgress style={{ marginTop: "10px", alignSelf: "center" }} />
      ) : (
        <button className="Button" onClick={() => handleClick()}>
          Register
        </button>
      )}
      {registered && (
        <Paper
          variant="outlined"
          style={{
            backgroundColor: "rgba(0,255,0, 0.1)",
            color: "rgba(0,255,0,0.7)",
            borderColor: "rgba(0,255,0,0.7)",
            padding: "20px"
          }}
        >
          <Typography variant="body1">
            Registration Successful. Kindly login.
          </Typography>
        </Paper>
      )}
      {registrationError && (
        <Paper
          variant="outlined"
          style={{
            backgroundColor: "rgba(255,0,0, 0.1)",
            color: "rgba(255,0,0,0.7)",
            borderColor: "rgba(255,0,0,0.7)",
            padding: "20px"
          }}
        >
          <Typography variant="caption">{registrationError}</Typography>
        </Paper>
      )}
    </div>
  );
};

export default Register;
