import React, { useEffect, useState } from 'react';
import { getUserInfo, getProducts } from './apiService'; 
import ProductCard from './ProductCard'; 
import { Link } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState({ name: '', points: 0 });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await getUserInfo(); 
                setUser(userInfo);

                const productData = await getProducts(); 
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
                    <ProductCard key={product.id} product={product} /> 
                ))}
            </div>
        </div>
    );
};

export default Home;
