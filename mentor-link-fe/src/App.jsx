import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages import
// ------------ Student Pages ----------------
import HomeStudent from './Pages/StudentPages/HomeStudent';
import ProjectManagement from './Pages/StudentPages/ProjectManagement';
import ProjectDetails from './Pages/StudentPages/ProjectDetails';
import DeadlineStudent from './Pages/StudentPages/DeadlineStudent';
import WalletStudent from './Pages/StudentPages/WalletStudent';
import AppointmentManagement from './Pages/StudentPages/AppointmentManagement';
import BookMentor from './Pages/StudentPages/BookMentor';
import StudentInfo from './Pages/StudentPages/StudentInfo';
// -------------------------------------------


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          // -------- Student Pages -------------------
          <Route path="/" element={<HomeStudent />} />
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route path="project-details" element={<ProjectDetails />}/>
          <Route path="deadline-student" element={<DeadlineStudent />}/>
          <Route path="wallet-student" element={<WalletStudent />}/>
          <Route path="appointment-management" element={<AppointmentManagement />}/>
          <Route path="book-mentor" element={<BookMentor />}/>
          <Route path="student-info" element={<StudentInfo />}/>
          // -------------------------------------------
          
        </Routes>
      </div>
    </Router>
  );
}

export default App
