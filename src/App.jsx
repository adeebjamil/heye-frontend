import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import DailyAttendance from './components/DailyAttendance';
import EmployeeLeaves from './components/EmployeeLeaves';
import ViewAttendance from './components/ViewAttendance';
import CreateEmployee from './components/CreateEmployee';
import ViewLeave from './components/ViewLeave';
import EmployeeList from './components/EmployeeList';
import DownloadPage from './components/download';
;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="create-employee" element={<CreateEmployee />} />
          <Route path="daily-attendance" element={<DailyAttendance />} />
          <Route path="employee-leaves" element={<EmployeeLeaves />} />
          <Route path="view-attendance" element={<ViewAttendance />} />
          <Route path="view-leave" element={<ViewLeave />} />
          <Route path="employee-list" element={<EmployeeList />} />
          <Route path="employee-list" element={<EmployeeList />} />
          <Route path="download" element={<DownloadPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;