import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useGlobalContext } from "../Context/GlobalContext";

const AddExpense = () => {
  const [newExpense, setNewExpense] = useState({ title: "", description: "", amount: "", date: "" });
  
  const {addExpense} = useGlobalContext();

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  

  return (
    <div className="flex max-h-96 mb-10">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>
        
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newExpense.description}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={newExpense.date}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={()=> {addExpense(newExpense)}}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
