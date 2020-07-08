import React from "react";
import { Button } from "@material-ui/core";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

import "../styles.css";

import Balance from "./Balance";
import IncomeExpense from "./IncomeExpense";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";

export default function MainApp() {
  let navigate = useNavigate();

  const handleLogout = async () => {
    await cookie.remove("auth-token", { path: "/" });
    navigate("/");
  };

  return (
    <>
      <Button onClick={() => handleLogout()}>Log out</Button>
      <Balance />
      <IncomeExpense />
      <TransactionList />
      <AddTransaction />
    </>
  );
}
