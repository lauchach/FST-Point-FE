import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home'; 
import Reward from './Reward'; 
import Profile from './Profile'; 
import ProductDetail from './ProductDetail'; 
import Navbar from './Navbar'; 
import './App.css';

const App = () => {
    return (
        <Router>
            <Navbar /> {/* แถบเมนูด้านล่าง */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} /> {/* เส้นทางไปยังหน้า Home */}
                <Route path="/rewards" element={<Reward />} /> {/* เส้นทางไปยังหน้า Reward */}
                <Route path="/profile" element={<Profile />} /> {/* เส้นทางไปยังหน้า Profile */}
                <Route path="/product/:id" element={<ProductDetail />} /> {/* หน้ารายละเอียดสินค้า */}
            </Routes>
        </Router>
    );
};

export default App;
