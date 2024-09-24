import Chart from "./Chart";
import { useGlobalContext } from "../../Context/GlobalContext";
import { useEffect } from "react";

const Home = () => {
  const { fetchExpenses, fetchIncomes, totalExpense, totalIncome } =
    useGlobalContext();

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, [fetchExpenses, fetchIncomes]);

  return (
    <div className="flex sm:ml-64 h-full">
      {/* <Sidebar /> */}
      <div className="flex-1 p-4 m-0 overflow-y-auto mt-12 sm:m-0 h-screen">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Total Expenses
          </h1>
          <h2 className="text-xl sm:text-2xl pb-4">₹{totalExpense()}</h2>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Total Incomes</h1>
          <h2 className="text-xl sm:text-2xl pb-4">₹{totalIncome()}</h2>
        </div>
        <div className="mb-8">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Home;
