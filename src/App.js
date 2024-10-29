// App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
 
import AdminLogin from './Website/AdminLogin';
import Sidebar from './Website/Sidebar';
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
 
function App() {
  const location = useLocation();
 
  // Check if the current path is the login page
  const isLoginPage = location.pathname === "/AdminLogin";
 
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
      </Routes>
      {!isLoginPage && <Footer />} {/* Only render Footer if it's not the login page */}
    </div>
  );
}
 
export default App;