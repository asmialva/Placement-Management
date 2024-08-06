import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDash from './pages/StudentDash'
import LoginPage from "./pages/LoginPage";
import AdminPage from './pages/AdminPage';
import CompanyForm from './pages/CompanyForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import StudentLogin from "./pages/StudentLogin";
import AddStudent from './components/AddStudent';
import AdminLogin from './pages/AdminLogin';
function App() {

  return (
    <>

      <Router>
        <NavBar />
        <Routes>
          <Route index element={<LoginPage />} />
          <Route exact path="/student" element={<StudentDash />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/admin-login" element={<AdminLogin />} />
          <Route exact path="/admin/add_student" element={<AddStudent />} />
          <Route exact path="/company" element={<CompanyForm />} />
          <Route exact path="/student-login" element={<StudentLogin />} />
        </Routes>
        <Footer/>
      </Router>

    </>
  )
}

export default App
