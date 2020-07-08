const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
        loading: false
      };

    case "ADD_TRANSACTION":
      console.log("INSIDE REDUCER", action.payload.text, action.payload.amount);
      return {
        ...state,
        loading: false,
        transactions: [
          ...state.transactions,
          {
            id: state.transactions.length,
            text: action.payload.text,
            amount: action.payload.amount
          }
        ]
      };

    case "REMOVE_TRANSACTION":
      return {
        ...state,
        loading: false,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload.id
        )
      };

    case "LOGIN":
      return {
        ...state,
        loading: false,
        loggedIn: true,
        loginError: ""
      };

    case "REGISTERED":
      return {
        ...state,
        registered: true,
        loading: false,
        registrationError: ""
      };

    case "REGISTRATION_FAILED":
      return {
        ...state,
        loading: false,
        registrationError: action.payload
      };

    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        loginError: action.payload
      };

    case "SHOW_LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default AppReducer;
