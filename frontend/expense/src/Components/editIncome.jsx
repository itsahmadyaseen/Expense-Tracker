import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const EditIncome = () => {
  const [incomes, setIncomes] = useState({ title: "", description: "", amount: "", date: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        // console.log('id', id);
        const response = await axiosInstance.get(`http://localhost:3000/api/v3/incomes/get-income/${id}`, { withCredentials: true });
        const incomeData = response.data;

        // Format the date as YYYY-MM-DD
        const formattedDate = incomeData.date
          ? new Date(incomeData.date).toISOString().split('T')[0] // Convert to YYYY-MM-DD format
          : '';

        setIncomes({
          description: incomeData.description || "",
          amount: incomeData.amount || "",
          date: formattedDate
        });
      } catch (error) {
        console.error("Error fetching income", error);
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setIncomes({ ...incomes, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(`http://localhost:3000/api/v3/incomes/update-income/${id}`, incomes, { withCredentials: true });
      console.log('Income updated:', response.data);
      navigate('/income');
    } catch (error) {
      console.error("Error updating income", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4">Edit Income</h2>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={incomes.description}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={incomes.amount}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={incomes.date}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Income
        </button>
      </div>
    </div>
  );
};

export default EditIncome;
