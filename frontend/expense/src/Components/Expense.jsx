import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Sidebar from "./Sidebar";
import AddExpense from "./AddExpense";
import { useGlobalContext } from "../Context/GlobalContext.jsx";

const Expense = () => {
  // const [expenses, setExpenses] = useState([]);
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();

  const { fetchExpenses, expenses,  } = useGlobalContext();

  useEffect(() => {
    
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`delete-expense/${id}`, {
        withCredentials: true,
      });
      const updatedExpenses = expenses.filter((exp) => exp._id !== id);
      // setExpenses(updatedExpenses);
      const totalSum = updatedExpenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      setSum(totalSum);
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 overflow-y-auto h-screen">
        
        <div>
          <AddExpense />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8">My Expenses</h1>
          <ul className="space-y-5">
            {expenses.map((expense) => (
              <li
                key={expense._id}
                className="p-6 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {expense.description}
                  </h2>
                  <p className="text-xl font-semibold text-gray-800">
                    ₹{expense.amount}
                  </p>
                  <p className="text-md text-gray-500 mt-1">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/edit-expense/${expense._id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Expense;
