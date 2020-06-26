import React, { useState, useContext, useEffect } from 'react';
import {
  Typography,
  Paper,
  IconButton,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  const {
    getTransactions,
    removeTransaction,
    transactions,
    loading,
  } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Delete = ({ id }) => (
    <IconButton aria-label="delete" onClick={() => removeTransaction(id)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );

  const Transaction = ({ id, text, amount }) => {
    const [showDelete, setShowDelete] = useState(false);
    return (
      <Paper
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '5px 0px',
          height: '50px',
          padding: '0px 20px',
          borderRight: '5px solid',
          borderColor: amount > 0 ? 'green' : 'red',
        }}
      >
        {showDelete ? <Delete id={id} /> : null}
        <div
          style={{
            display: 'flex',
            width: ' 100%',
            justifyContent: 'space-between',
            marginLeft: '10px',
          }}
        >
          <Typography>{text}</Typography>
          <Typography>{`$${amount}`}</Typography>
        </div>
      </Paper>
    );
  };

  return (
    <>
      <Typography variant="h6">History</Typography>
      <Divider />
      {loading ? (
        <div
          style={{ display: 'flex', margin: '20px', justifyContent: 'center' }}
        >
          <CircularProgress />
        </div>
      ) : (
        transactions.map((transaction, index) => (
          <Transaction
            key={index}
            id={transaction._id}
            text={transaction.text}
            amount={transaction.amount}
          />
        ))
      )}
    </>
  );
};

export default TransactionList;
