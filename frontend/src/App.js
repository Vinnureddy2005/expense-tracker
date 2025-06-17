import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { isLoggedIn, logout } from './auth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function Home() {
  return (
    <div className="expense-home-container">
      <h2 className="expense-home-title">Welcome to Expense Tracker</h2>
      <div className="expense-home-buttons">
        <Link to="/login" className="expense-btn expense-login-btn">Login</Link>
        <Link to="/register" className="expense-btn expense-register-btn">Register</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="expense-app-container">
        <h1 className="expense-app-title">Expense Tracker</h1>

        {isLoggedIn() && (
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="logout-btn"
          >
            Logout
          </button>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login navigate={(p) => window.location.replace(p)} />}
          />
          <Route
            path="/register"
            element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Register navigate={(p) => window.location.replace(p)} />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
