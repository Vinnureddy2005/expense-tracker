
// import {
//     ArcElement,
//     Chart as ChartJS,
//     Legend,
//     Tooltip
// } from 'chart.js';
// import { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const Analytics = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     fetch('http://localhost:5000/expenses/analytics', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         const labels = data.map(item => item._id);
//         const values = data.map(item => item.totalAmount);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: 'Total Spent',
//               data: values,
//               backgroundColor: [
//                 '#60A5FA',
//                 '#34D399',
//                 '#F87171',
//                 '#FBBF24',
//                 '#A78BFA',
//                 '#F472B6'
//               ],
//               borderWidth: 1
//             }
//           ]
//         });
//       });
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded shadow mt-4">
//       <h2 className="text-lg font-bold mb-4">Spending by Category</h2>
//       {chartData ? (
//         <Pie data={chartData} />
//       ) : (
//         <p className="text-gray-500">Loading chart...</p>
//       )}
//     </div>
//   );
// };

// export default Analytics;


// import {
//     ArcElement,
//     Chart as ChartJS,
//     Legend,
//     Tooltip
// } from 'chart.js';
// import { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import '../styles/Analytics.css'; // ← Add this

// ChartJS.register(ArcElement, Tooltip, Legend);

// const Analytics = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     fetch('http://localhost:5000/expenses/analytics', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         const labels = data.map(item => item._id);
//         const values = data.map(item => item.totalAmount);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: 'Total Spent',
//               data: values,
//               backgroundColor: [
//                 '#60A5FA',
//                 '#34D399',
//                 '#F87171',
//                 '#FBBF24',
//                 '#A78BFA',
//                 '#F472B6'
//               ],
//               borderWidth: 1
//             }
//           ]
//         });
//       });
//   }, []);

//   return (
//     <div className="analytics-container">
//       <h2 className="analytics-title">Spending by Category</h2>
//       {chartData ? (
//         <Pie data={chartData} />
//       ) : (
//         <p className="analytics-loading">Loading chart...</p>
//       )}
//     </div>
//   );
// };

// export default Analytics;

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import '../styles/Analytics.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const Analytics = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [budgetData, setBudgetData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${token}` };

      // Total spending by category
      const res1 = await fetch('http://localhost:5000/expenses/analytics', { headers });
      const category = await res1.json();
      setCategoryData({
        labels: category.map(item => item._id),
        datasets: [{
          label: 'Total Spent',
          data: category.map(item => item.totalAmount),
          backgroundColor: ['#60A5FA', '#34D399', '#F87171', '#FBBF24', '#A78BFA', '#F472B6'],
          borderWidth: 1
        }]
      });

      // Monthly spending trend
      const res2 = await fetch('http://localhost:5000/expenses/monthly', { headers });
      const monthly = await res2.json();
      setMonthlyData({
        labels: monthly.map(item => item.month),
        datasets: [{
          label: 'Monthly Spending',
          data: monthly.map(item => item.total),
          fill: false,
          borderColor: '#3B82F6',
          tension: 0.3
        }]
      });

      // Category-wise breakdown (Bar)
      const res3 = await fetch('http://localhost:5000/expenses/category-breakdown', { headers });
      const bar = await res3.json();
      setBarData({
        labels: bar.map(item => item._id),
        datasets: [{
          label: 'Category Total',
          data: bar.map(item => item.total),
          backgroundColor: '#10B981'
        }]
      });

      // Budget vs Actual
      const res4 = await fetch('http://localhost:5000/expenses/budget', { headers });
      const budget = await res4.json();
      setBudgetData({
        labels: budget.map(item => item.category),
        datasets: [
          {
            label: 'Budget',
            data: budget.map(item => item.budget),
            backgroundColor: '#FBBF24'
          },
          {
            label: 'Actual',
            data: budget.map(item => item.actual),
            backgroundColor: '#EF4444'
          }
        ]
      });
    };

    fetchData();
  }, []);

  return (
    <div className="analytics-container space-y-10 px-4 py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics Dashboard</h2>

      {categoryData && (
        <div>
          <h3 className="text-xl font-semibold mb-2">1. Total Spending by Category</h3>
          <Pie data={categoryData} />
        </div>
      )}

      {monthlyData && (
        <div>
          <h3 className="text-xl font-semibold mb-2">2. Monthly Spending Trend</h3>
          <Line data={monthlyData} />
        </div>
      )}

      {barData && (
        <div>
          <h3 className="text-xl font-semibold mb-2">3. Category-wise Breakdown</h3>
          <Bar data={barData} />
        </div>
      )}

      {budgetData && (
        <div>
          <h3 className="text-xl font-semibold mb-2">4. Budget vs Actual Spending</h3>
          <Bar data={budgetData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default Analytics;
