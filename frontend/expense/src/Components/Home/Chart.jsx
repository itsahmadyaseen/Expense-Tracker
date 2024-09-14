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
import axiosInstance from "../../axiosInstance";

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
        const fetchedExpenses = response.data.data;
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
      const newDate = new Date(date);
      return newDate.toLocaleDateString();
    }),
    datasets: [
      {
        label: "Income",
        data: incomes.map((income) => income.amount),
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true, // Ensures chart resizes
    maintainAspectRatio: false, // Disable aspect ratio to fit any container size
    scales: {
      x: {
        ticks: {
          autoSkip: true, // Prevents overcrowding of labels
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <div className="w-full h-80 md:h-[500px]">
      <Line data={data} options={options} />
    </div>
  );
}

export default Chart;
