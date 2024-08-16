// // src/components/LineChart.js
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';

// ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const LineChart = () => {
//     const data = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [
//             {
//                 label: 'Sales',
//                 data: [65, 59, 80, 81, 56, 55, 40],
//                 borderColor: '#007bff',
//                 backgroundColor: 'rgba(0, 123, 255, 0.2)',
//                 fill: true,
//             }
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function(tooltipItem) {
//                         return `Sales: ${tooltipItem.raw}`;
//                     }
//                 }
//             }
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Month'
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Sales'
//                 },
//                 beginAtZero: true
//             }
//         }
//     };

//     return <Line data={data} options={options} />;
// };

// export default LineChart;
