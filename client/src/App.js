import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/chatRoom";
import SetAvatar from "./pages/SetAvatar";
import './app.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Chat />}></Route>
        <Route path="/setAvatar" element={<SetAvatar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
