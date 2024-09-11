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
  const navigate = useNavigate();

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v2/expenses/get-expenses",
        {
          withCredentials: true,
        }
      );

      console.log("response - ", response.data.data);

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

  const deleteExpense = async () => {
    try {
      await axiosInstance.delete(`delete-expense/${id}`, {
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
      await axiosInstance.post(
        "http://localhost:3000/api/v3/incomes/create-Income",
        newIncome,
        { withCredentials: true }
      );
      console.log("added ");

      //   navigate("/income");
      await fetchIncomes();
    } catch (error) {
      console.error("Error creating Income", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v1/users/get-users"
      );
      // console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users", error.message);
    }
  };

  const fetchGroups = async () => {
    try {
      // console.log('inside get groups');
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v4/groups/get-groups"
      );
      // console.log('response', response.data);
      setGroups(response.data);
    } catch (err) {
      console.log("Error fetching groups ", err);
    }
  };

  const removeMember = async (groupId, userId) => {
    try {
      await axiosInstance.delete(
        `http://localhost:3000/api/v4/groups/remove-member/${groupId}`,
        { data: { userId } }
      );
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v4/groups/get-groups"
      ); // refresh
      setGroups(response.data);
    } catch (error) {
      console.log("Error removing member from group", error);
    }
  };

  const fetchSharedExpense = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v5/share/get-shared-expense"
      );
      // console.log("sharedExpenses", response.data.data);
      setSharedExpenses(response.data.data);
    } catch (error) {
      console.log("Error fetching shared expense", error);
    }
  };

  const createSharedExpense = async (data) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/v5/share/create-shared-expense",
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
        removeMember,
        sharedExpenses,
        fetchSharedExpense,
        createSharedExpense,
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
