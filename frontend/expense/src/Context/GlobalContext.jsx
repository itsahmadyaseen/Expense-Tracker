import React, { createContext, useCallback, useContext, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const navigate = useNavigate();

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/get-expenses", {
        withCredentials: true,
      });

      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }, []);

  const addExpense = async (newExpense) => {
    try {
      const response = await axiosInstance.post("/create-expense", newExpense, {
        withCredentials: true,
      });
      console.log("Expense created:", response.data);
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);

      //   navigate("/expense");
      await fetchExpenses();
    } catch (error) {
      console.error("Error creating expense", error);
    }
  };

  const totalExpense = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  const fetchIncomes = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v3/incomes/get-incomes",
        {
          withCredentials: true,
        }
      );
      const fetchedIncomes = response.data;

      setIncomes(fetchedIncomes);
    } catch (error) {
      console.error("Error fetching incomes", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }, []);

  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(
        `http://localhost:3000/api/v3/incomes/delete-income/${id}`,
        {
          withCredentials: true,
        }
      );
      const updatedIncomes = incomes.filter((exp) => exp._id !== id);
      setIncomes(updatedIncomes);
    } catch (error) {
      console.error("Error deleting income", error);
    }
  };

  const addIncome = async (newIncome) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/v3/incomes/create-Income",
        newIncome,
        { withCredentials: true }
      );

    //   navigate("/income");
    await fetchIncomes()
    } catch (error) {
      console.error("Error creating Income", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        expenses,
        incomes,
        addExpense,
        fetchExpenses,
        fetchIncomes,
        totalExpense,
        totalIncome,
        deleteIncome,
        addIncome,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  console.log("Global Context:", context);
  return context;
};
