import React, { createContext, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";
import cookie from "react-cookies";

const InitialState = {
  transactions: []
};

export const GlobalContext = createContext(InitialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, InitialState);

  //Action Definitions
  const addTransaction = async (text, amount) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": cookie.load("auth-token")
      }
    };
    try {
      showLoading();
      const res = await axios.post(
        "/api/v1/transactions",
        { text, amount },
        config
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data
      });
      getTransactions();
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error
      });
    }
  };

  const removeTransaction = async id => {
    console.log(id);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": cookie.load("auth-token")
      }
    };
    try {
      showLoading();
      await axios.delete(`/api/v1/transactions/${id}`, config);
      dispatch({
        type: "REMOVE_TRANSACTION",
        payload: {
          id
        }
      });
      getTransactions();
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error
      });
    }
  };

  const getTransactions = async () => {
    const config = {
      headers: {
        "auth-token": cookie.load("auth-token")
      }
    };
    try {
      showLoading();
      const res = await axios.get("/api/v1/transactions", config);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error
      });
    }
  };

  const login = async values => {
    showLoading();

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: values,
      url: "/api/user/login"
    };
    try {
      const res = await axios(options);
      const token = res.headers["auth-token"];
      cookie.save("auth-token", token, { path: "/" });
      dispatch({
        type: "LOGIN"
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_FAILED",
        payload: error.response.data.error
      });
    }
  };

  const register = async values => {
    showLoading();

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: values,
      url: "/api/user/register"
    };

    try {
      const res = await axios(options);
      console.log(res);
      dispatch({
        type: "REGISTERED"
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "REGISTRATION_FAILED",
        payload: error.response.data.error
      });
    }
  };

  const showLoading = () =>
    dispatch({
      type: "SHOW_LOADING"
    });

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        loggedIn: state.loggedIn,
        registered: state.registered,
        registrationError: state.registrationError,
        loginError: state.loginError,
        addTransaction,
        removeTransaction,
        getTransactions,
        login,
        register
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
