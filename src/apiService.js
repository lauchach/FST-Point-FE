import axios from 'axios';

// สร้าง instance ของ axios เพื่อใช้ส่ง request ไปยัง backend
const api = axios.create({
    baseURL: 'http://localhost:4000/api', // เปลี่ยน URL ตาม backend ที่คุณใช้งาน
    timeout: 5000, // ตั้ง timeout สำหรับ request (ในกรณีที่ต้องการ)
});

// เพิ่มตัวตรวจสอบ request (request interceptor) เพื่อแนบ token ใน header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // ดึง token จาก local storage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // เพิ่ม token ใน headers
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้งาน
export const getUserInfo = async () => {
    try {
        const response = await api.get('/user'); // เรียก API สำหรับข้อมูลผู้ใช้
        return response.data; // ส่งคืนข้อมูลผู้ใช้งาน
    } catch (error) {
        throw error.response || error.message;
    }
};

// ฟังก์ชันเพื่อดึงข้อมูลรายละเอียดของสินค้า/สิทธิพิเศษ
export const getProductDetails = async (productId) => {
    try {
        const response = await api.get(`/products/${productId}`); // เรียก API เพื่อดึงข้อมูลสินค้าเฉพาะ
        return response.data; // ส่งคืนข้อมูลรายละเอียดสินค้า
    } catch (error) {
        throw error.response || error.message;
    }
};

// ฟังก์ชันเพื่อดำเนินการแลกรับสิทธิ์
export const redeemProduct = async (productId) => {
    try {
        const response = await api.post(`/products/${productId}/redeem`); // เรียก API สำหรับแลกรับสิทธิ์
        return response.data; // ส่งคืนข้อมูลที่ได้รับ เช่น คะแนนที่เหลือ
    } catch (error) {
        throw error.response || error.message;
    }
};

// ฟังก์ชันเพื่อดึงรายการสินค้าหรือสิทธิพิเศษทั้งหมด
export const getProducts = async () => {
    try {
        const response = await api.get('/products'); // เรียก API เพื่อดึงรายการสินค้าทั้งหมด
        return response.data; // ส่งคืนข้อมูลรายการสินค้า
    } catch (error) {
        throw error.response || error.message;
    }
};


// ฟังก์ชันเพื่อดึงข้อมูลประวัติการแลกรับสิทธิ์
export const getRedeemedProducts = async () => {
    try {
        const response = await api.get('/redeemed-products');
        return response.data;
    } catch (error) {
        throw error.response || error.message;
    }
};

// ฟังก์ชันเพื่อดึงข้อมูลโปรไฟล์ผู้ใช้งาน
export const getUserProfile = async () => {
    console.log(73)
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        throw error.response || error.message;
    }
};

// ฟังก์ชันเพื่ออัปเดตข้อมูลโปรไฟล์ผู้ใช้งาน
export const updateUserProfile = async (profile) => {
    try {
        const response = await api.put('/user/profile', profile);
        return response.data;
    } catch (error) {
        throw error.response || error.message;
    }
};



export const login = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;  // Return the data from the response
    } catch (error) {
        throw error.response || error.message;
    }
};

