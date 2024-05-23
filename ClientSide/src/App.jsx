import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Manager from './Manager';
import UploadProduct from './UploadProduct';
import AllProducts from './AllProducts';
import Kofia from './Products/Kofia';
import Sweta from './Products/Sweta';
import Tshirts from './Products/Tshirts';
import Pensi from './Products/Pensi';
import Tracks from './Products/Tracks';
import Sales from './Sales';
import Login from './Login';

function App() {
  const [openSideBarToggle, setSideBarToggle] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const OpenSidebar = () => {
    setSideBarToggle(!openSideBarToggle);
  }

  const handleLogin = (auth) => {
    setIsAuthenticated(auth);
    setShowLogin(!auth);
  }

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSideBarToggle={openSideBarToggle} OpenSidebar={OpenSidebar}/>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/Manager" element={<ProtectedRoute isAuthenticated={isAuthenticated} setShowLogin={setShowLogin} />} />
          <Route path="/UploadProduct" element={<UploadProduct />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/Kofia" element={<Kofia />} />
          <Route path="/Tshirts" element={<Tshirts />} />
          <Route path="/Sweta" element={<Sweta />} />
          <Route path="/Pensi" element={<Pensi />} />
          <Route path="/Tracks" element={<Tracks />} />
          <Route path="/Sales" element={<Sales />} />
        </Routes>
        {showLogin && <Login onLogin={handleLogin} setShowLogin={setShowLogin} />}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

const ProtectedRoute = ({ isAuthenticated, setShowLogin }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      setShowLogin(true);
      navigate('/');
    }
  }, [isAuthenticated, navigate, setShowLogin]);

  return isAuthenticated ? <Manager /> : null;
};

export default App;
