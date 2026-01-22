import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
  type ChartData,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

interface GraphItem {
  clickDate: string;
  count: number;
}

interface GraphProps {
  graphData: GraphItem[];
}

const Graph: React.FC<GraphProps> = ({ graphData }) => {
  const labels = graphData.map((item) => item.clickDate);
  const usersPerDay = graphData.map((item) => item.count);

  const data: ChartData<"bar"> = {
    labels: graphData.length ? labels : Array(14).fill(""),
    datasets: [
      {
        label: "Total Clicks",
        data: graphData.length
          ? usersPerDay
          : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor: graphData.length
          ? "#3b82f6"
          : "rgba(54, 162, 235, 0.1)",
        borderColor: "#1D2327",
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback(value) {
            return Number.isInteger(value) ? value.toString() : "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return <Bar className="w-full" data={data} options={options} />;
};

export default Graph;
