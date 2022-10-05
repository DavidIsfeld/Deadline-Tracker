// Copyright (c) 2022 David Isfeld

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import UpdateDeadline from './pages/UpdateDeadline';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to="/login" /> }
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" /> }
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" /> }
            />
            <Route 
              path="/update"
              element={user ? <UpdateDeadline /> : <Navigate to="/login" /> }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
