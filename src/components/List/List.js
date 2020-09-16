import React from "react";
import "./List.css";

const List = ({ items, removeItem, editItem, income, expense, total }) => {
  return (
    <div className="container">
      <div className="results">
        <div>
          <h2 className="resultsIncome">Income: ${income}</h2>
        </div>
        <div>
          <h2 className="resultsExpense">Expense: ${expense}</h2>
        </div>
        <div>
          <h2 className="resultsTotal">Total: ${total}</h2>
        </div>
      </div>

      <div className="list">
        <div className="heading">
          <div className="field">Amount</div>
          <div className="field">Notes</div>
          <div className="field">Time</div>
          <div className="field">Options</div>
        </div>

        {items.map((item) => (
          <div key={item.id} className={`row row${item.category}`}>
            <div className="field">
              {item.category === "Expense" && "-"}
              {item.amount}
            </div>
            <div className="field">{item.detail}</div>
            <div className="field">
              <small>{item.time}</small>
            </div>
            <div className="field">
              <i
                onClick={() => editItem(item)}
                className="fa fa-edit"
                aria-hidden="true"
              ></i>
              <i
                onClick={() => removeItem(item.id)}
                className="fa fa-trash"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
