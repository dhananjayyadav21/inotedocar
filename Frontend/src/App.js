import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/note/NoteState";
import AlertState from "./context/alert/AlertState";
import Userdetails from "./components/Userdetails";

function App() {
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/user" element={<Userdetails />} />
          </Routes>
        </Router>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
