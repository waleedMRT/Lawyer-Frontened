import axios from 'axios';

// إنشاء نسخة مخصصة من Axios تحتوي على الرابط الأساسي للـ Backend الخاص بنا
const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // رابط دجانجو الذي بنيناه سابقاً
    timeout: 5000, // إلغاء الطلب إذا تأخر السيرفر لأكثر من 5 ثوانٍ
});

export default api;