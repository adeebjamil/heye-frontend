import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 hover:scale-105">
          Lovosis Technology PVT. LTD
        </h1>
        <ul className="space-y-3">
          {[
            { path: "/", label: "Home" },
            { path: "/create-employee", label: "Create Employee" },
            { path: "/daily-attendance", label: "Daily Attendance" },
            { path: "/employee-leaves", label: "Employee Leaves" },
            { path: "/view-attendance", label: "View Attendance" },
            { path: "/view-leave", label: "View Leave" },
            { path: "/employee-list", label: "Our Team" }
          ].map((item) => (
            <li key={item.path} className="mb-2 transform transition-all duration-200 hover:translate-x-2">
              <Link
                to={item.path}
                className={`block py-2.5 px-4 rounded-lg transition-all duration-300 ease-in-out
                  ${location.pathname === item.path 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                    : 'hover:bg-gray-700 hover:shadow-md'
                  }
                  backdrop-blur-sm backdrop-filter
                  hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;