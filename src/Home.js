import React, { useEffect, useState } from 'react';
import { getUserInfo, getProducts } from './apiService'; // Import API calls for user info and products
import ProductCard from './ProductCard'; // Product card component
import { Link } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState({ name: '', points: 0 });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await getUserInfo(); // Get user name and points
                setUser(userInfo);

                const productData = await getProducts(); // Fetch product list
                setProducts(productData.products);
            } catch (err) {
                setError('Failed to load data: ' + err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Welcome, {user.name}</h2>
            <h3>Points: {user.points}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} /> // Render each product
                ))}
            </div>
        </div>
    );
};

export default Home;
