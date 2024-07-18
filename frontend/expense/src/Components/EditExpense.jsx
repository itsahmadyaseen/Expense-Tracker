import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const EditExpense = () => {
  const [expense, setExpense] = useState({ description: "", amount: "", date: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axiosInstance.get(`/get-expense/${id}`, { withCredentials: true });
        console.log('Fetched expense data:', response.data);

        const expenseData = response.data;

        // Format the date as YYYY-MM-DD
        const formattedDate = expenseData.date
          ? new Date(expenseData.date).toISOString().split('T')[0] // Convert to YYYY-MM-DD format
          : '';

        setExpense({
          description: expenseData.description || "",
          amount: expenseData.amount || "",
          date: formattedDate
        });
      } catch (error) {
        console.error("Error fetching expense", error);
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(`/update-expense/${id}`, expense, { withCredentials: true });
      console.log('Expense updated:', response.data);
      navigate('/');
    } catch (error) {
      console.error("Error updating expense", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4">Edit Expense</h2>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expense.description}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Expense
        </button>
      </div>
    </div>
  );
};

export default EditExpense;
