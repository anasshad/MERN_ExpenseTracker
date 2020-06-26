const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };

    case 'ADD_TRANSACTION':
      console.log('INSIDE REDUCER', action.payload.text, action.payload.amount);
      return {
        ...state,
        loading: false,
        transactions: [
          ...state.transactions,
          {
            id: state.transactions.length,
            text: action.payload.text,
            amount: action.payload.amount,
          },
        ],
      };
    case 'REMOVE_TRANSACTION':
      return {
        ...state,
        loading: false,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        ),
      };
    case 'SHOW_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default AppReducer;
