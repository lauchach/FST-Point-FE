import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails, redeemProduct } from './apiService'; // API for product details and redeem
import ConfirmDialog from './ConfirmDialog'; // Dialog for confirmation

const ProductDetail = () => {
    const { id } = useParams(); // Get the product ID from URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
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

    const handleRedeem = () => {
        if (product && product.canRedeem) {
            setDialogVisible(true); // Show confirmation dialog
        }
    };

    const handleConfirmRedeem = async () => {
        try {
            await redeemProduct(id); // Redeem the product
            navigate('/home'); // Navigate back to home after redeeming
        } catch (err) {
            setError('Failed to redeem product: ' + err.message);
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {product && (
                <div>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Points to redeem: {product.points}</p>
                    <p>Expires on: {product.expiryDate}</p>
                    <p>Conditions: {product.conditions}</p>
                    
                    {/* ปุ่มแลกรับสิทธิ์ ถ้าคะแนนไม่พอจะถูก Disabled */}
                    <button 
                        onClick={handleRedeem} 
                        disabled={product.points > product.userPoints || !product.canRedeem}> 
                        {/* Disable เมื่อคะแนนผู้ใช้ไม่พอ หรือไม่สามารถแลกรับได้ */}
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
