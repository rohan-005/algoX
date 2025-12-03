import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css'
import Landing from "./pages/Landing";
import Syllabus from "./pages/Syllabus";
// import Questions from "./pages/Questions";
import QuestionsLayout from "./pages/QuestionsLayout";
import QuestionDetails from "./pages/QuestionDetails";

function App() {

  return (
    <Router>
      <div className="app">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/curriculum" element={<Syllabus/>} />
        <Route path="/question" element={<QuestionsLayout />}>
          <Route path=":id" element={<QuestionDetails />} />
        </Route>
      </Routes>
      </div>
    </Router>
  )
}

export default App
