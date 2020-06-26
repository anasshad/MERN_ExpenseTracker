import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

const InitialState = {
  transactions: [],
};

export const GlobalContext = createContext(InitialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, InitialState);

  //Action Definitions
  const addTransaction = async (text, amount) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      showLoading();
      const res = await axios.post(
        '/api/v1/transactions',
        { text, amount },
        config
      );
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const removeTransaction = async (id) => {
    try {
      showLoading();
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'REMOVE_TRANSACTION',
        payload: {
          id,
        },
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const getTransactions = async () => {
    try {
      showLoading();
      const res = await axios.get('/api/v1/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const showLoading = () => 
  dispatch({
    type: 'SHOW_LOADING'
  })

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        addTransaction,
        removeTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
