import Sidebar from "./Sidebar";
import Chart from "./Chart";
import { useGlobalContext } from "../Context/GlobalContext";
import { useEffect } from "react";

const Home = () => {
  const { fetchExpenses, fetchIncomes, totalExpense, totalIncome } =
    useGlobalContext();

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, [fetchExpenses, fetchIncomes]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 overflow-y-auto h-screen">
        <div>
          <h1 className="text-3xl font-bold mb-8">Total Expenses</h1>
          <h2 className="text-2xl pb-6">₹{totalExpense()}</h2>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8">Total Incomes</h1>
          <h2 className="text-2xl pb-6">₹{totalIncome()}</h2>
        </div>
        <div>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Home;
