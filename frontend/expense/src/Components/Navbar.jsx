/* eslint-disable react/prop-types */
import { FiSidebar } from "react-icons/fi";
const Navbar = ({ toggleSidebar, isOpen }) => {
  const username = localStorage.getItem("username");

  return (
    <nav className="bg-indigo-950 p-4 sm:ml-64 text-white sm:h-16 h-24 border">
      <div className="container mx-auto flex justify-between ">
        <FiSidebar
          onClick={toggleSidebar}
          className="sm:hidden p-1 h-10 w-16 text-white cursor-pointer top-4 left-1 z-50 rounded-sm"
        >
          {/* Conditionally render based on whether sidebar is open or not */}
          {isOpen ? "Close" : "Menu"}
        </FiSidebar>
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <h1 className="text-xl ml-4 font-semibold">{username}</h1>
      </div>
    </nav>
  );
};

export default Navbar;
