import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const startTime = performance.now();
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/attendance`)
      const attendanceData = response.data;
      const endTime = performance.now();
      console.log(`Data fetched in ${endTime - startTime} ms`);

      const weeklyData = getWeeklyData(attendanceData);
      setChartData(weeklyData);
    } catch (error) {
      console.error('Failed to fetch attendance data', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeeklyData = (attendanceData) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weeklyData = daysOfWeek.map(day => ({ day, present: 0, absent: 0 }));

    attendanceData.forEach(record => {
      const day = new Date(record.date).getDay();
      if (day !== 0) {
        const index = day - 1;
        if (record.status === 'Present') {
          weeklyData[index].present += 1;
        } else if (record.status === 'Absent') {
          weeklyData[index].absent += 1;
        }
      }
    });

    const labels = weeklyData.map(data => data.day);
    const presentData = weeklyData.map(data => data.present);
    const absentData = weeklyData.map(data => data.absent);

    return {
      labels,
      datasets: [
        {
          label: 'Present',
          data: presentData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          borderRadius: 5,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        },
        {
          label: 'Absent',
          data: absentData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          borderRadius: 5,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Weekly Attendance',
        font: {
          size: 20,
          family: "'Inter', sans-serif",
          weight: 'bold'
        },
        padding: 20
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 bg-white rounded-xl shadow-2xl"
    >
      <motion.h1
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Weekly Attendance Overview
      </motion.h1>
      <motion.div
        className="chart-container p-6 bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-inner"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400">Loading chart...</div>
          </div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Home;
