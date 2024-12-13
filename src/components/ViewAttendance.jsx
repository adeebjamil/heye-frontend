import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [workDone, setWorkDone] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/attendance`);
      setAttendanceRecords(response.data || []);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setErrorMessage('Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setDate(new Date(record.date).toISOString().split('T')[0]);
    setStatus(record.status);
    setWorkDone(record.workDone);
  };

  const handleDelete = async (id) => {
    console.log(`Deleting record with id: ${id}`); // Log the id being deleted
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/attendance/${id}`);
      setAttendanceRecords(attendanceRecords.filter(record => record._id !== id));
    } catch (error) {
      console.error('Error deleting attendance record:', error);
      setErrorMessage('Failed to delete attendance record');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(`Updating record with id: ${editingRecord._id}`); // Log the id being updated
    try {
      const updatedRecord = { date, status, workDone };
      await axios.put(`${import.meta.env.VITE_SERVER}/attendance/${editingRecord._id}`, updatedRecord);
      setAttendanceRecords(attendanceRecords.map(record => 
        record._id === editingRecord._id ? { ...record, ...updatedRecord } : record
      ));
      setEditingRecord(null);
      setDate('');
      setStatus('');
      setWorkDone('');
    } catch (error) {
      console.error('Error updating attendance record:', error);
      setErrorMessage('Failed to update attendance record');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/attendance/download-attendance`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_records.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setErrorMessage('Failed to download PDF');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6"
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        View Attendance Records
      </motion.h1>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-6 text-center p-4 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white flex items-center justify-center space-x-2"
          >
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Done</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceRecords.map(record => (
                <motion.tr 
                  key={record._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.employeeId?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                        record.status === 'Absent' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {record.status || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {record.workDone || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(record)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(record._id)} className="text-red-600 hover:text-red-900">
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {editingRecord && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-xl p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Attendance Record</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Half Day">Half Day</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Work Done</label>
              <textarea
                value={workDone}
                onChange={(e) => setWorkDone(e.target.value)}
                className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter work done"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Record
              </button>
              <button
                type="button"
                onClick={() => setEditingRecord(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleDownloadPDF}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Download Attendance PDF
        </button>
      </div>
    </motion.div>
  );
};

export default ViewAttendance;