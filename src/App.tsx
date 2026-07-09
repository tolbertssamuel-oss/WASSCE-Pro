import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Subjects from "./pages/Subjects"
import SubjectDetail from "./pages/SubjectDetail"
import Practice from "./pages/Practice"
import MockExams from "./pages/MockExams"
import MockExamSession from "./pages/MockExamSession"
import StudyNotes from "./pages/StudyNotes"
import NoteDetail from "./pages/NoteDetail"
import AiTutor from "./pages/AiTutor"
import Leaderboard from "./pages/Leaderboard"
import Analytics from "./pages/Analytics"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Contact from "./pages/Contact"
import About from "./pages/About"
import AdminDashboard from "./pages/AdminDashboard"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/subjects/:slug" element={<SubjectDetail />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/practice/:subjectId" element={<Practice />} />
      <Route path="/mock-exams" element={<MockExams />} />
      <Route path="/mock-exams/:examId" element={<MockExamSession />} />
      <Route path="/study-notes" element={<StudyNotes />} />
      <Route path="/study-notes/:id" element={<NoteDetail />} />
      <Route path="/ai-tutor" element={<AiTutor />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
