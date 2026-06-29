import  { useState } from "react";
import api from "../api"; 

export default function Appointment() {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    appointment_date: "",
    appointment_time: "",
    consultation_type: "office", 
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    // إرسال البيانات المتوافقة مع دجانجو
    api.post("appointments/", formData)
      .then((response) => {
        setIsSubmitting(false);
        setStatusType("success");
        setStatusMessage("✅ تم تسجيل طلب الموعد بنجاح! حجزك الآن معلق بانتظار التثبيت.");
        
        // تفريغ الاستمارة
        setFormData({
          client_name: "",
          client_email: "",
          client_phone: "",
          appointment_date: "",
          appointment_time: "",
          consultation_type: "office",
          notes: "",
        });
      })
      .catch((error) => {
        setIsSubmitting(false);
        setStatusType("error");
        setStatusMessage("❌ حدث خطأ أثناء الحجز. يرجى مراجعة البيانات والمحاولة مرة أخرى.");
        console.error("Django Error Details:", error.response?.data || error.message);
      });
  };

  return (
    <div className="appointment__page" style={{ maxWidth: "700px", margin: "0 auto" }}>
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ color: "#233D4D", fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>حجز موعد <span>استشارة قانونية</span></h2>
        <p style={{ color: "#7f8c8d" , fontSize: "clamp(.8rem , 1.5vw , 1rem)" }}>يرجى ملء البيانات المطلوبة لإرسال طلب حجز مباشر لجدول المواعيد الخاص بالمكتب.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid #eceff1" }}>
        
        {/* اسم العميل */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>الاسم الكامل</label>
          <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} required placeholder="أدخل اسمك الثلاثي" style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* البريد الإلكتروني للعميل */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>البريد الإلكتروني</label>
          <input type="email" name="client_email" value={formData.client_email} onChange={handleChange} required placeholder="example@mail.com" style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* رقم الهاتف */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>رقم الهاتف</label>
          <input type="tel" name="client_phone" value={formData.client_phone} onChange={handleChange} required placeholder="0XXXXXXXXX" style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* نوع الاستشارة (مطابق لخيارات CONSULTATION_TYPES في دجانجو) */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>نوع الاستشارة</label>
          <select name="consultation_type" value={formData.consultation_type} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff" }}>
            <option value="office">حضورية في المكتب</option>
            <option value="online">أونلاين (Zoom/Phone)</option>
          </select>
        </div>

        {/* التاريخ والوقت في سطر واحد متجاوب */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>تاريخ الموعد</label>
            <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
          </div>
          
          <div style={{ flex: "1", minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>وقت الموعد</label>
            {/* استخدام type="time" ليرسل الوقت بصيغة HH:MM المناسبة لـ TimeField في دجانجو */}
            <input type="time" name="appointment_time" value={formData.appointment_time} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
          </div>
        </div>

        {/* ملاحظات أو تفاصيل القضية */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>ملاحظات أو تفاصيل القضية (اختياري)</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" placeholder="اكتب تفاصيل إضافية تود إطلاع المحامي عليها..." style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}></textarea>
        </div>

        {/* العرض الشرطي لرسالة التغذية الراجعة */}
        {statusMessage && (
          <div style={{ padding: "15px", marginBottom: "20px", borderRadius: "4px", backgroundColor: statusType === "success" ? "#d4edda" : "#f8d7da", color: statusType === "success" ? "#155724" : "#721c24", fontWeight: "bold" }}>
            {statusMessage}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "15px", backgroundColor: isSubmitting ? "#95a5a6" : "#FE7F2D", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", cursor: isSubmitting ? "not-allowed" : "pointer", fontWeight: "bold" }}>
          {isSubmitting ? "جاري تسجيل طلبك..." : "تأكيد طلب حجز الموعد"}
        </button>

      </form>
    </div>
  );
}