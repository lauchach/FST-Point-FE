import React, { useEffect, useState } from 'react';
import { getProducts } from './apiService'; // Import the API service for fetching products
import ProductCard from './ProductCard'; // A separate component for rendering individual products

const Home = () => {
    const [points, setPoints] = useState(0);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch products and user points when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts(); // Fetch products from the API service
                setPoints(data.points); // Update points from response
                setProducts(data.products); // Update product list from response
            } catch (err) {
                setError('Failed to fetch products: ' + (err.message || err));
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Points: {points}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} /> // Reusable ProductCard component for each product
                ))}
            </div>
        </div>
    );
};

export default Home;
