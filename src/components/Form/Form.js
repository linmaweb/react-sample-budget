import React from "react";
import "./Form.css";

const Form = ({
  category,
  setCategory,
  detail,
  setDetail,
  amount,
  setAmount,
  currentId,
  handleSubmit,
  cancelEdit,
}) => {
  return (
    <div className="formWrapper">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Category</label>
            <select
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
              autoFocus
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div>
            <label>Amount</label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label>Notes</label>
            <input
              type="text"
              required
              value={detail}
              placeholder="(add some notes...)"
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>

          <button tabIndex="0" type="submit">
            {currentId !== null ? "Update" : "Add"}
          </button>
          {currentId !== null && <button onClick={cancelEdit}>Cancel</button>}
        </form>
      </div>
    </div>
  );
};

export default Form;
