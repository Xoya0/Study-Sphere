import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import VideoRooms from "./pages/VideoRooms";
import LiveRooms from "./pages/LiveRooms";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./components/Leaderboard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import KnowledgeBattle from "./pages/KnowledgeBattle";
import Challenges from './pages/Challenges';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<ChatRoom />} />
              <Route path="/video-rooms" element={<VideoRooms />} />
              <Route path="/live-rooms" element={<LiveRooms />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/knowledge-battle" element={<KnowledgeBattle />} />
              <Route path="/challenges" element={<Challenges />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
