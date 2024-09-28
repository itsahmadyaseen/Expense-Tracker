/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [sharedExpenses, setSharedExpenses] = useState([]);
  const [shares, setShares] = useState([]);
  const [settledData, setSettledData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/expenses/get-expenses", {
        withCredentials: true,
      });

      setExpenses(response.data.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }, []);

  const addExpense = async (newExpense) => {
    try {
      const response = await axiosInstance.post(
        "/expenses/create-expense",
        newExpense,
        {
          withCredentials: true,
        }
      );
      console.log("Expense created:", response.data);
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);

      //   navigate("/expense");
      await fetchExpenses();
    } catch (error) {
      console.error("Error creating expense", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/expenses/delete-expense/${id}`, {
        withCredentials: true,
      });
      const updatedExpenses = expenses.filter((exp) => exp._id !== id);
      setExpenses(updatedExpenses);
      await fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  const totalExpense = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  const fetchIncomes = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/incomes/get-incomes", {
        withCredentials: true,
      });
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
      await axiosInstance.delete(`/incomes/delete-income/${id}`, {
        withCredentials: true,
      });
      const updatedIncomes = incomes.filter((exp) => exp._id !== id);
      setIncomes(updatedIncomes);
    } catch (error) {
      console.error("Error deleting income", error);
    }
  };

  const addIncome = async (newIncome) => {
    try {
      await axiosInstance.post("/incomes/create-Income", newIncome, {
        withCredentials: true,
      });

      await fetchIncomes();
    } catch (error) {
      console.error("Error creating Income", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users");
      // console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users", error.message);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axiosInstance.get("/groups/get-groups");
      setGroups(response.data);
    } catch (err) {
      console.log("Error fetching groups ", err);
    }
  };

  const addMember = async (groupId, selectedUser) => {
    try {
      await axiosInstance.post(`/groups/add-member/${groupId}`, {
        userId: selectedUser,
      });
      fetchGroups();
    } catch (error) {
      console.log("Error selecting user, ", error.message);
    }
  };

  const removeMember = async (groupId, userId) => {
    try {
      await axiosInstance.delete(`/groups/remove-member/${groupId}`, {
        data: { userId },
      });
      fetchGroups();
    } catch (error) {
      console.log("Error removing member from group", error);
    }
  };

  const fetchSharedExpense = async () => {
    try {
      const response = await axiosInstance.get("/share/get-shared-expense");
      setSharedExpenses(response.data.data);
    } catch (error) {
      console.log("Error fetching shared expense", error);
    }
  };

  const createSharedExpense = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/share/create-shared-expense",
        data,
        { withCredentials: true }
      );

      const newExpense = response.data.data;

      setSharedExpenses((prevExpenses) => [...prevExpenses, newExpense]);

      fetchSharedExpense();
    } catch (error) {
      console.log("Error adding shared expense", error);
    }
  };

  const removeSharedExpense = async (expenseId) => {
    try {
      await axiosInstance.delete(`/share/delete-shared-expense/${expenseId}`);

      fetchSharedExpense();
    } catch (error) {
      console.log("Error deleting shared expense", error.message);
      alert("Error deleting shared expense");
    }
  };

  const fetchShares = async () => {
    try {
      const response = await axiosInstance.get(`/pay-shares/get-pay-shares`);
      setShares(response.data.data);
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const createPayShare = async (newShare) => {
    try {
      await axiosInstance.post("/pay-shares/create-pay-share", newShare);
      fetchReult();
    } catch (error) {
      console.log("Error creating share:", error);
    }
  };

  const fetchReult = async () => {
    try {
      const response = await axiosInstance.post("/pay-shares/settle-pay-share");

      setSettledData(response.data);
    } catch (error) {
      console.log("Error creating share:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        expenses,
        incomes,
        addExpense,
        fetchExpenses,
        deleteExpense,
        fetchIncomes,
        totalExpense,
        totalIncome,
        deleteIncome,
        addIncome,
        fetchUsers,
        users,
        fetchGroups,
        groups,
        addMember,
        removeMember,
        sharedExpenses,
        fetchSharedExpense,
        createSharedExpense,
        removeSharedExpense,
        fetchShares,
        shares,
        loading,
        createPayShare,
        fetchReult,
        settledData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  // console.log("Global Context:", context);
  return context;
};
