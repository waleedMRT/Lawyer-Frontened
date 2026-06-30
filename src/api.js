import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
    timeout: 5000, // إلغاء الطلب إذا تأخر السيرفر لأكثر من 5 ثوانٍ
});

export default api;