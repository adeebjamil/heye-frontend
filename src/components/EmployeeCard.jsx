import React from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';

const EmployeeCard = ({ employee, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/employees/${employee._id}`);
      onDelete(employee._id);
    } catch (error) {
      console.error('Failed to delete employee', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg rounded-xl p-6 mb-6"
    >
      <img
        src={employee.avatar || 'https://via.placeholder.com/150'}
        alt={`${employee.name}'s avatar`}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold text-center text-gray-800">{employee.name}</h2>
      <p className="text-center text-gray-600">{employee.position}</p>
      <p className="text-center text-gray-600">{employee.email}</p>
      <p className="text-center text-gray-600">{employee.mobile}</p>
      <div className="flex justify-center mt-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors duration-300"
        >
          <FaTrash size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EmployeeCard;