import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Sidebar from "./Sidebar";

const Home = () => {
  const [expenseSum, setExpenseSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axiosInstance.get("/get-expenses", {
          withCredentials: true,
        });
        
        const fetchedExpenses = response.data;

        const totalSum = fetchedExpenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setExpenseSum(totalSum);
      } catch (error) {
        console.error("Error fetching expenses", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    const fetchIncomes = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/v3/incomes/get-incomes",
          {
            withCredentials: true,
          }
        );
        const fetchedIncomes = response.data;

        const totalSum = fetchedIncomes.reduce(
          (acc, income) => acc + income.amount,
          0
        );
        setIncomeSum(totalSum);
      } catch (error) {
        console.error("Error fetching incomes", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchExpenses();
    fetchIncomes();
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 overflow-y-auto h-screen">
        <div>
          <h1 className="text-3xl font-bold mb-8">Total Expenses</h1>
          <h2 className="text-2xl pb-6">₹{expenseSum}</h2>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8">Total Incomes</h1>
          <h2 className="text-2xl pb-6">₹{incomeSum}</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
