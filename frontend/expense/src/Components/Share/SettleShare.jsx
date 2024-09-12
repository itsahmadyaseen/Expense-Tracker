import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useGlobalContext } from "../../Context/GlobalContext";

const SettleShare = () => {
  const { settledData, fetchReult } = useGlobalContext();

  useEffect(() => {
    fetchReult();
  }, []);

  return (
    <div>
      <div>
        {settledData.totalAmount >= 0 ? (
          <p className="text-2xl">
            You are at lead by {settledData.totalAmount}
          </p>
        ) : (
          <p className="text-2xl">
            Yor are trailing by {settledData.totalAmount}
          </p>
        )}
      </div>
    </div>
  );
};

export default SettleShare;
