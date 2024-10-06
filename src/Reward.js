import React, { useState, useEffect } from 'react';
import { getRedeemedProducts } from './apiService'; // API สำหรับดึงประวัติการแลกสิทธิ์

const Reward = () => {
    const [redeemedProducts, setRedeemedProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getRedeemedProducts(); // ดึงข้อมูลประวัติการแลกรับ
                setRedeemedProducts(products);
            } catch (err) {
                setError('Failed to load redeemed products: ' + err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Reward History</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {redeemedProducts.length > 0 ? (
                <ul>
                    {redeemedProducts.map((product) => (
                        <li key={product.id}>
                            <h4>{product.name}</h4>
                            <p>Redeemed on: {product.redeemedDate}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No rewards redeemed yet.</p>
            )}
        </div>
    );
};

export default Reward;
