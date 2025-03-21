import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages import
// Guest Pages
import Login from './Pages/GuestPages/Login';
// ------------ Student Pages ----------------
import HomeStudent from './Pages/StudentPages/HomeStudent';
import ProjectManagement from './Pages/StudentPages/ProjectManagement';
import ProjectDetails from './Pages/StudentPages/ProjectDetails';
import DeadlineStudent from './Pages/StudentPages/DeadlineStudent';
import WalletStudent from './Pages/StudentPages/WalletStudent';
import AppointmentManagement from './Pages/StudentPages/AppointmentManagement';
import BookMentor from './Pages/StudentPages/BookMentor';
import StudentInfo from './Pages/StudentPages/StudentInfo';
import MentorList from './Pages/StudentPages/MentorList';
// -------------------------------------------
// ------------ Lecturer Pages ---------------
import HomeLecturer from './Pages/LecturerPages/HomeLecturer';
import ProjectListLecturer from './Pages/LecturerPages/ProjectListLecturer';
import ProjectDetailLecturer from './Pages/LecturerPages/ProjectDetailLecturer';
// -------------------------------------------

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            // -------- Student Pages --------------------
            <Route path="/" element={<HomeStudent />} />
            <Route path="/project-management" element={<ProjectManagement />} />
            <Route path="project-details" element={<ProjectDetails />}/>
            <Route path="deadline-student" element={<DeadlineStudent />}/>
            <Route path="wallet-student" element={<WalletStudent />}/>
            <Route path="appointment-management" element={<AppointmentManagement />}/>
            <Route path="book-mentor" element={<BookMentor />}/>
            <Route path="student-info" element={<StudentInfo />}/>
            <Route path="mentor-list" element={<MentorList />}/>
            // -------------------------------------------
            // -------- Lecturer Pages -------------------
            <Route path="/home-lecturer" element={<HomeLecturer />} />
            <Route path="/project-list-lecturer" element={<ProjectListLecturer />} />
            <Route path="/project-detail-lecturer" element={<ProjectDetailLecturer />} />
            // -------------------------------------------
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
