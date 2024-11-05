

// App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Website imports
import AdminLogin from './Website/AdminLogin';
import Sidebar from './Website/Sidebar_A';
import Nav from './Website/Nav';
import Admin_attendance from './Website/Admin_attendance';
import Admin_Report from './Website/Admin_Report';
import Admin_Dash from './Website/Admin_Dash';
import HomePage from './Website/HomePage';
import A_FeedbackForm from './Website/A_FeedbackForm';
import A_feedback from './Website/A_feedback';
import ReviewList from './Website/ReviewList';
import Registraion from './Website/Registraion';
import Footer from './Website/Admin_footer';
 
// Manager


import ManagerEvaluation from './Manager/ManagerEvaluation';


import GoalManagement from './Manager/GoalManagement';
import TrainingDevelopmentPage from './Manager/Training';
// import A_feedback from './components/Feedback';
import CreateProfile from './Manager/CreateProfile';

import { Feedback } from '@mui/icons-material';
import M_feedback from './Manager/Feedback';
import ManagerLogin from './Manager/ManagerLogin';
import Manager_Dashboard from './Manager/Dashboard';



// Employee routes import
import EmployeeLogin from './Component/EmployeeLogin';
import Dashboard from './Component/Dashboard';
import EmployeeSelfEvaluation from './Component/EmployeeSelfEvaluation';
import EmployeeProfile from './Component/EmployeeProfile';
import ReportsAnalytics from './Component/ReportsAnalytics';
import TrainingAndDevelopment from './Component/TrainingAndDevelopment';
import Navbar from './Component/Navbar';

function App() {
  const location = useLocation();

  // Check if the current path is the login page
  const isLoginPage = location.pathname === "/AdminLogin"|| location.pathname === "/ManagerLogin";

 
  // const isLoginPage = location.pathname === "/AdminLogin";

  return (
    <div>
      {!isLoginPage && <Nav />} {/* Only render Nav if it's not the login page */}
      <Routes>
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Sidebar" element={<Sidebar />} />
                {/* <Route path="/Nav" element={<Nav />} /> */}

        <Route path="/Admin_attendance" element={<Admin_attendance />} />
        <Route path="/Admin_Report" element={<Admin_Report />} />
        <Route path="/Admin_Dash" element={<Admin_Dash />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/A_FeedbackForm" element={<A_FeedbackForm />} />
        <Route path="/A_feedback" element={<A_feedback />} />
        <Route path="/ReviewList" element={<ReviewList />} />
        <Route path="/Registraion" element={<Registraion />} />
        {/* manager */}
        <Route path='/managerlogin' element={<ManagerLogin/>} />
         
          <Route path='/manager-evaluation' element={<ManagerEvaluation />} />
       
        
          <Route path='/Manager_Dashboard' element={<Manager_Dashboard/>}/>
          <Route path='/GoalManagement' element={<GoalManagement/>}/>
          <Route path='/Training' element={<TrainingDevelopmentPage/>}/>
          <Route path="/M_feedback"element={<M_feedback/>}/>
           <Route path='/createprofile'element={<CreateProfile/>}/>

        {/* Employee Route */}
        <Route path="" element={<EmployeeLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/EmployeeSelfEvaluation" element={<EmployeeSelfEvaluation />} />
        <Route path="/EmployeeProfile" element={<EmployeeProfile />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/TrainingAndDevelopment" element={<TrainingAndDevelopment />} />
        <Route path="/ReportsAnalytics" element={<ReportsAnalytics />} />
        <Route path="/Feedback" element={<Feedback />} />
      </Routes>
      {!isLoginPage && <Footer />} {/* Only render Footer if it's not the login page */}
    </div>
  );
}

export default App;
