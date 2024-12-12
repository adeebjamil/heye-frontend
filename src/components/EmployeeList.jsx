import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';
import { motion } from 'framer-motion';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    }
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp._id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto p-6"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        Our Lovosis Team
      </motion.h1>

      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {employees.map(employee => (
          <motion.div
            key={employee._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <EmployeeCard employee={employee} onDelete={handleDelete} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EmployeeList;