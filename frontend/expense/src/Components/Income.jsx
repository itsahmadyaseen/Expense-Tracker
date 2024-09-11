import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Sidebar from "./Sidebar";
import AddIncome from "./AddIncome";
import { useGlobalContext } from "../Context/GlobalContext";

const Income = () => {
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();
  const {incomes, fetchIncomes, deleteIncome } = useGlobalContext();

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 overflow-y-auto h-screen">
        
        <div>
          <AddIncome />
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
                    onClick={() => deleteIncome(income._id)}
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
