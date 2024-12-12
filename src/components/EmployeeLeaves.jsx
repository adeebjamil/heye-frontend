import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeLeave = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER}/employees`)
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    const employee = employees.find(emp => emp._id === employeeId);
    setSelectedEmployee(employee);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_SERVER}/leaves`, { employeeId: selectedEmployee._id, startDate, endDate, reason, status })
      .then(response => {
        setMessage(response.data.message);
        setStartDate('');
        setEndDate('');
        setReason('');
        setStatus('Pending');
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Refresh the page after 2 seconds
      })
      .catch(error => {
        console.error(error);
        setMessage('Error submitting leave request');
      });
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
        Employee Leave Request
      </motion.h1>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-6 text-center p-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center space-x-2"
          >
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Employee</label>
          <motion.select
            whileTap={{ scale: 0.98 }}
            onChange={handleEmployeeChange}
            className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.name} - {employee.position}
              </option>
            ))}
          </motion.select>
        </div>

        <AnimatePresence>
          {selectedEmployee && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-inner">
                <h2 className="text-xl font-bold mb-4">Employee Details</h2>
                <motion.div className="space-y-2">
                  <p><strong>Name:</strong> {selectedEmployee.name}</p>
                  <p><strong>Position:</strong> {selectedEmployee.position}</p>
                  <p><strong>Email:</strong> {selectedEmployee.email}</p>
                  <p><strong>Mobile:</strong> {selectedEmployee.mob}</p>
                </motion.div>
              </div>

              <motion.form 
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4"
              >
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </motion.div>

                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </motion.div>

                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2">Reason</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter reason for leave"
                  />
                </motion.div>

                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Submit Leave Request
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default EmployeeLeave;