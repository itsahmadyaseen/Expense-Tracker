import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const AddExpense = () => {
  const [newExpense, setNewExpense] = useState({ title: "", description: "", amount: "", date: "" });
  
  const [expenses, setExpenses] = useState([]);
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const response = await axiosInstance.post('/create-expense', newExpense, { withCredentials: true });
      console.log('Expense created:', response.data);
      setNewExpense({ title: "", description: "", amount: "", date: "" });
      
      navigate('/expense');
      window.location.reload();
    } catch (error) {
      console.error("Error creating expense", error);
    }
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
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
