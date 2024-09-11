import { useEffect } from "react";
import Sidebar from "../Sidebar";
import AddSharedExpense from "./AddSharedExpense";
import SharedExpenseDetailsCards from "./SharedExpenseDetailsCards";
import { useGlobalContext } from "../../Context/GlobalContext";
// import SettleShare from "./SettleShare";

const NewSharedExpense = () => {
  const {
    fetchGroups,
    fetchSharedExpense,
    fetchUsers,
    sharedExpenses,
    groups,
    users,
  } = useGlobalContext();

  useEffect(() => {
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
            <SharedExpenseDetailsCards
              users={users}
              groups={groups}
              sharedExpenses={sharedExpenses}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewSharedExpense;
