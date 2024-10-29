import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard  from './components/Dashboard';
import ManagerLogin from './components/ManagerLogin';
import ManagerEvaluation from './components/ManagerEvaluation';
import Task from './components/Task';
import Holiday from './components/Holiday';
import LeaveManagement from './components/LeaveManagement';
import Policies from './components/Policies';
import ProfilePage from './components/ProfilePage';
import GoalManagement from './components/GoalManagement';
import TrainingDevelopmentPage from './components/Training';
import A_feedback from './components/Feedback';
import CreateProfile from './components/CreateProfile';
import Register from './components/Register';


// maas-frontend\maas-frontend\src\pages\StartfcInsta.js/x
function App() {
  return (
    
    <Router>
      
      <div>
        <Routes>
          <Route path='/' element={<ManagerLogin/>} />
          <Route path='/Dashboars' element={<Dashboard/>}/>
          <Route path='/manager-evaluation' element={<ManagerEvaluation />} />
       
          <Route path='/task' element={<Task/>}/>
          <Route path='/holiday' element={<Holiday/>}/>
          <Route path='/leave' element={<LeaveManagement/>}/>
          <Route path='/policies' element={<Policies/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/GoalManagement' element={<GoalManagement/>}/>
          <Route path='/Training' element={<TrainingDevelopmentPage/>}/>
           <Route path='/Feedback'element={<A_feedback/>}/>
           <Route path='/createprofile'element={<CreateProfile/>}/>
           {/* <Route path='/register'element={<Register/>}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
