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
// ------------ Mentor Pages -----------------
import AppointmentListMentor from './Pages/MentorPages/AppointmentListMentor';
import AppointmentDetailMentor from './Pages/MentorPages/AppointmentDetailMentor';
// -------------------------------------------
// ------------ Lecturer Pages ---------------
import HomeLecturer from './Pages/LecturerPages/HomeLecturer';
import ProjectListLecturer from './Pages/LecturerPages/ProjectListLecturer';
import ProjectDetailLecturer from './Pages/LecturerPages/ProjectDetailLecturer';
import ReportLecturer from './Pages/LecturerPages/ReportLecturer';
// -------------------------------------------
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route path="/" element={<PrivateRoute element={<HomeStudent />} allowedRoles={['student']} />} />
            <Route path="/project-management" element={<PrivateRoute element={<ProjectManagement />} allowedRoles={['student']} />} />
            <Route path="/project-details" element={<PrivateRoute element={<ProjectDetails />} allowedRoles={['student']} />} />
            <Route path="/deadline-student" element={<PrivateRoute element={<DeadlineStudent />} allowedRoles={['student']} />} />
            <Route path="/wallet-student" element={<PrivateRoute element={<WalletStudent />} allowedRoles={['student']} />} />
            <Route path="/appointment-management" element={<PrivateRoute element={<AppointmentManagement />} allowedRoles={['student']} />} />
            <Route path="/book-mentor/:id" element={<PrivateRoute element={<BookMentor />} allowedRoles={['student']} />} />
            <Route path="/student-info" element={<PrivateRoute element={<StudentInfo />} allowedRoles={['student']} />} />
            <Route path="/mentor-list" element={<PrivateRoute element={<MentorList />} allowedRoles={['student']} />} />
            
            {/* Mentor Routes */}
            <Route path="/appointment-list-mentor" element={<PrivateRoute element={<AppointmentListMentor />} allowedRoles={['mentor']} />} />
            <Route path="/appointment-detail-mentor/:id" element={<PrivateRoute element={<AppointmentDetailMentor />} allowedRoles={['mentor']} />} />
            {/* Lecturer Routes */}
            <Route path="/home-lecturer" element={<PrivateRoute element={<HomeLecturer />} allowedRoles={['lecturer']} />} />
            <Route path="/project-list-lecturer" element={<PrivateRoute element={<ProjectListLecturer />} allowedRoles={['lecturer']} />} />
            <Route path="/project-detail-lecturer/:id" element={<PrivateRoute element={<ProjectDetailLecturer />} allowedRoles={['lecturer']} />} />
            <Route path="/report-lecturer" element={<PrivateRoute element={<ReportLecturer />} allowedRoles={['lecturer']} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
