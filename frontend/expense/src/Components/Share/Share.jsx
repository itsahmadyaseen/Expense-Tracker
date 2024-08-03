import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Sidebar from "../Sidebar";
import SettleShare from "./SettleShare";
import AddShare from "./AddShare";

const Share = () => {
  const [shares, setShares] = useState([]);
  const [showSettleShare, setShowSettleShare] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddShare, setShowAddShare] = useState(false); // State for AddShare modal

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/api/v7/pay-shares/get-pay-shares`
        );
        setShares(response.data.data);
      } catch (error) {
        console.log("error: ", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchShares();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-screen">
        <Sidebar className="flex-shrink-0" />
        <div className="flex flex-col w-full h-full">
          <div className="flex-grow overflow-auto p-4">
            <h1 className="text-3xl">Fetching Shares...</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full h-screen">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col w-full h-full">
        <div className="flex-grow overflow-auto p-4">
          <ul className="space-y-4">
            {shares.map((share) => (
              <li
                key={share._id}
                className="p-6 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <p className="text-xl">Description: {share.description}</p>

                  <p className="text-xl">Amount: ₹{share.amount}</p>
                  {share.paymentObject && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold">Payment Details:</h3>
                      <ul>
                        {Object.entries(share.paymentObject).map(
                          ([userId, amount]) => (
                            <li key={userId} className="text-md">
                              {userId} - ₹{amount}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {share.expenseObject && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold">Expense Details:</h3>
                      <ul>
                        {Object.entries(share.expenseObject).map(
                          ([userId, amount]) => (
                            <li key={userId} className="text-md">
                              {userId} - ₹{amount}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-shrink-0 bg-gray-100 p-4 flex justify-between">
          <button
            className="bg-blue-500 px-4 py-2 rounded text-white"
            onClick={() => setShowAddShare(true)} // Show AddShare modal
          >
            Add Share
          </button>
          <button
            className="bg-red-600 px-4 py-2 rounded text-white"
            onClick={() => setShowSettleShare(true)}
          >
            Settle
          </button>
        </div>
        {showSettleShare && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <SettleShare />
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setShowSettleShare(false)}
            >
              Close
            </button>
          </div>
        )}
        {showAddShare && (
          <AddShare onClose={() => setShowAddShare(false)} /> // Render AddShare component
        )}
      </div>
    </div>
  );
};

export default Share;
