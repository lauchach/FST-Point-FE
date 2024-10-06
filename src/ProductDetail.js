import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails, redeemProduct } from './apiService';
import ConfirmDialog from './ConfirmDialog';
import './ProductDetail.css'; // นำเข้าไฟล์ CSS

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState('center');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getProductDetails(id);
                setProduct(productData);
            } catch (err) {
                setError('Failed to load product details: ' + err.message);
            }
        };
        fetchData();
    }, [id]);

    const handleMouseMove = (event) => {
        const x = event.clientX / window.innerWidth * 100;
        const y = event.clientY / window.innerHeight * 100;
        setBackgroundPosition(`${x}% ${y}%`);
    };

    const handleRedeem = () => {
        if (product && product.canRedeem) {
            setDialogVisible(true);
        }
    };

    const handleConfirmRedeem = async () => {
        try {
            await redeemProduct(id);
            navigate('/home');
        } catch (err) {
            setError('Failed to redeem product: ' + err.message);
        }
    };

    return (
        <div 
            className="product-detail-container" 
            onMouseMove={handleMouseMove} 
            style={{ backgroundPosition: backgroundPosition }}>
            {error && <p className="error-message">{error}</p>}
            {product && (
                <div>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Points to redeem: {product.points}</p>
                    <p>Expires on: {product.expiryDate}</p>
                    <p>Conditions: {product.conditions}</p>
                    
                    <button 
                        onClick={handleRedeem} 
                        disabled={product.points > product.userPoints || !product.canRedeem}>
                        Redeem
                    </button>
                </div>
            )}
            {dialogVisible && (
                <ConfirmDialog 
                    message="Are you sure you want to redeem this product?" 
                    onConfirm={handleConfirmRedeem} 
                    onCancel={() => setDialogVisible(false)} 
                />
            )}
        </div>
    );
};

export default ProductDetail;
