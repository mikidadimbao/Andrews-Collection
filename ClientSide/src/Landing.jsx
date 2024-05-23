import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
// Import other components
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

function App() {
  const [openSideBarToggle, setSideBarToggle] = useState(false)

  const OpenSidebar = () => {
    setSideBarToggle(!openSideBarToggle)
  }
  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSideBarToggle={openSideBarToggle} OpenSidebar={OpenSidebar}/>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/Manager" element={<Home />} />
          <Route path="/UploadProduct" element={<UploadProduct />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/Kofia" element={<Kofia />} />
          <Route path="/Tshirts" element={<Tshirts />} />
          <Route path="/Sweta" element={<Sweta />} />
          <Route path="/Pensi" element={<Pensi />} />
          <Route path="/Tracks" element={<Tracks />} />
          <Route path="/Sales" element={<Sales />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
