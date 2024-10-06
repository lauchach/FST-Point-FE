import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home'; // หน้า Home
import Reward from './Reward'; // หน้า Reward
import Profile from './Profile'; // หน้า Profile
import ProductDetail from './ProductDetail'; // หน้ารายละเอียดสินค้า
import Navbar from './Navbar'; // แถบเมนูด้านล่าง
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
