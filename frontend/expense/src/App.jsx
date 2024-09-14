import AddExpense from "./Components/Expense/AddExpense.jsx";
import EditExpense from "./Components/Expense/EditExpense.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/User/Login.jsx";
import Profile from "./Components/User/Profile.jsx";
import Signup from "./Components/User/Signup.jsx";
import { Routes, Route } from "react-router-dom";
import Income from "./Components/Income/Income.jsx";
import AddIncome from "./Components/Income/AddIncome.jsx";
import EditIncome from "./Components/Income/editIncome.jsx";
import Expense from "./Components/Expense/Expense.jsx";
import Groups from "./Components/Group/Groups.jsx";
import NewSharedExpense from "./Components/Shared Expense/NewSharedExpense.jsx";
import Share from "./Components/Share/Share.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/shared-expense" element={<NewSharedExpense />} />
        <Route path="/new-shared-expense" element={<NewSharedExpense />} />
        <Route path="/share" element={<Share />} />
        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/edit-income/:id" element={<EditIncome />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
