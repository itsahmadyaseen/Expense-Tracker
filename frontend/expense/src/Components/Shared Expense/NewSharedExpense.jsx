import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Sidebar from "../Sidebar";
import AddSharedExpense from "./AddSharedExpense";
import SharedExpenseDetailsCards from "./SharedExpenseDetailsCards";
// import SettleShare from "./SettleShare";

const NewSharedExpense = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [sharedExpenses, setSharedExpenses] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/v4/groups/get-groups"
        );
        console.log("groups ", response.data);
        setGroups(response.data);
      } catch (error) {
        console.log("Error adding shared expense", error.message);
        alert("Error adding shared expense");
      }
    };

    const fetchSharedExpense = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/v5/share/get-shared-expense"
        );
        console.log("sharedExpenses", response.data.data);
        setSharedExpenses(response.data.data);
      } catch (error) {
        console.log("Error fetching shared expense", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/v1/users/get-users"
        );
        console.log("users ", response.data);
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching users", error.message);
      }
    };

    fetchGroups();
    fetchUsers();
    fetchSharedExpense();
  }, []);

  return (
    <div className=" flex shared-expense-container ">
      <div>
        <Sidebar />
      </div>
      <div className="h-screen overflow-auto w-full">
        <div className=" p-3">
          <AddSharedExpense groups={groups} users={users} />
        </div>

        <div className="w-full m-2">
          <h1 className="text-3xl font-bold mb-8 mt-8">Shared Expenses</h1>
          <ul className="space-y-5 p-2">
            <SharedExpenseDetailsCards users={users} groups={groups} sharedExpenses={sharedExpenses} />
          </ul>
        </div>
      
        
      </div>
    </div>
  );
};

export default NewSharedExpense;
