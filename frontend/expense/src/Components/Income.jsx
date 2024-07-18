import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Sidebar from "./Sidebar";
import AddIncome from "./AddIncome";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:3000/api/v3/incomes/get-incomes", {
          withCredentials: true,
        });
        const fetchedIncomes = response.data;

        setIncomes(fetchedIncomes);

        const totalSum = fetchedIncomes.reduce(
          (acc, income) => acc + income.amount,
          0
        );
        setSum(totalSum);
      } catch (error) {
        console.error("Error fetching incomes", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchIncomes();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:3000/api/v3/incomes/delete-income/${id}`, {
        withCredentials: true,
      });
      const updatedIncomes = incomes.filter((exp) => exp._id !== id);
      setIncomes(updatedIncomes);
      const totalSum = updatedIncomes.reduce(
        (acc, income) => acc + income.amount,
        0
      );
      setSum(totalSum);
    } catch (error) {
      console.error("Error deleting income", error);
    }
  };


  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 p-10 overflow-y-auto h-screen">
        <div>
          <h1 className="text-3xl font-bold mb-8">Total Income</h1>
          <h2 className="text-2xl pb-6">₹{sum}</h2>
        </div>
        <div>
          <AddIncome/>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8">My Incomes</h1>
          <ul className="space-y-5">
            {incomes.map((income) => (
              <li
                key={income._id}
                className="p-6 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {income.description}
                  </h2>
                  <p className="text-xl font-semibold text-gray-800">
                    ₹{income.amount}
                  </p>
                  <p className="text-md text-gray-500 mt-1">
                    {new Date(income.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/edit-income/${income._id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(income._id)}
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

export default Income;
