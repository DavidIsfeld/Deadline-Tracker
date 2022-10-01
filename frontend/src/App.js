import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import UpdateDeadline from './pages/UpdateDeadline';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={ <Home /> }
            />
            <Route 
              path="/login"
              element={ <Login /> }
            />
            <Route 
              path="/signup"
              element={ <Signup /> }
            />
            <Route 
              path="/update"
              element={ <UpdateDeadline /> }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
