import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Form from "../Form/Form";
import List from "../List/List";
import "./App.css";

const App = () => {
  const [category, setCategory] = useState("Income");
  const [detail, setDetail] = useState("");
  const [amount, setAmount] = useState("");
  const [currentId, setcurrentId] = useState(null);
  const [items, setItems] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const onLoading = useRef(true);

  const isInputInvalid = () =>
    detail.trim() === "" || amount.trim() === "" || category.trim() === "";

  const formatNumber = (n) => parseFloat(n).toFixed(2);
  const formatTime = moment().format("MMM DD YYYY HH:mm");

  const clearInputs = () => {
    setDetail("");
    setAmount("");
    setCategory("Income");
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        category,
        detail,
        amount: formatNumber(amount),
        time: formatTime,
        id: uuidv4(),
      },
    ]);
  };

  const editItem = (item) => {
    setCategory(item.category);
    setDetail(item.detail);
    setAmount(item.amount);
    setcurrentId(item.id);
  };

  const updateItem = () => {
    setItems(
      items.map((item) =>
        item.id === currentId
          ? {
              ...item,
              category,
              detail,
              amount: formatNumber(amount),
              time: formatTime,
            }
          : item
      )
    );
  };

  const updateAmount = () => {
    let totalIncome = items
      .filter((item) => item.category === "Income")
      .reduce((acc, item) => (acc += +item.amount), 0);
    let totalExpense = items
      .filter((item) => item.category === "Expense")
      .reduce((acc, item) => (acc += +item.amount), 0);
    setIncome(formatNumber(totalIncome));
    setExpense(formatNumber(totalExpense));
    setTotal(
      formatNumber(formatNumber(totalIncome) - formatNumber(totalExpense))
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const cancelEdit = () => {
    clearInputs();
    setcurrentId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearInputs();
    setcurrentId(null);
    if (isInputInvalid()) return;
    !currentId ? addItem() : updateItem();
  };

  useEffect(() => {
    if (onLoading.current) {
      onLoading.current = false;
    } else {
      localStorage.setItem("items", JSON.stringify([...items]));
      clearInputs();
      updateAmount();
    }
  }, [items]);

  useEffect(() => {
    if (localStorage.getItem("items") !== null) {
      setItems(JSON.parse([...items, localStorage.getItem("items")]));
    }
  }, []);

  return (
    <div className="App">
      <Form
        detail={detail}
        setDetail={setDetail}
        amount={amount}
        setAmount={setAmount}
        currentId={currentId}
        handleSubmit={handleSubmit}
        cancelEdit={cancelEdit}
        category={category}
        setCategory={setCategory}
      />
      <List
        items={items}
        removeItem={removeItem}
        editItem={editItem}
        income={income}
        expense={expense}
        total={total}
      />
    </div>
  );
};

export default App;
