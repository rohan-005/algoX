import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css'
import Landing from "./pages/Landing";
import Syllabus from "./pages/Syllabus";

function App() {

  return (
    <Router>
      <div className="app">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/curriculum" element={<Syllabus/>} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
