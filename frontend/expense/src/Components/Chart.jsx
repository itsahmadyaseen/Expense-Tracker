import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axiosInstance.get("/get-expenses", {
          withCredentials: true,
        });

        const fetchedExpenses = response.data;
        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error("Error fetching expenses", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    const fetchIncomes = async () => {
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
    };

    fetchExpenses();
    fetchIncomes();
  }, []);

  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      const newDate = new Date(date)
        const formated = newDate.toLocaleDateString();
      return formated;
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <>
      <Line data={data} />
    </>
  );
}
export default Chart;
