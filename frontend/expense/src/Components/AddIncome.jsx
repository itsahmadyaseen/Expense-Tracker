import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useGlobalContext } from "../Context/GlobalContext";

const AddIncome = () => {
  const [newIncome, setNewIncome] = useState({ title: "", description: "", amount: "", date: "" });

  const {addIncome} = useGlobalContext();
  const handleChange = (e) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await addIncome(newIncome);
    setNewIncome({ title: "", description: "", amount: "", date: "" });
  }
  

  return (
    <div className="flex max-h-96 mb-10">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4">Add New Income</h2>
        
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newIncome.description}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newIncome.amount}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={newIncome.date}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={()=>{handleSubmit}}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncome;
