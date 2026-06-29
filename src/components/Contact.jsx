import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  const form = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const sendEmail = (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setStatusMessage("");
    const SERVICE_ID = "service_eqvqywf";
    const TEMPLATE_ID = "template_gvn32bg";
    const PUBLIC_KEY = "xyWbUci-PRCLE-KeC";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        setIsSubmitting(false);
        setStatusType("success");
        setStatusMessage("✅ تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت.");
        e.target.reset(); // تفريغ حقول الإدخال بعد النجاح
      },
      (error) => {
        setIsSubmitting(false);
        setStatusType("error");
        setStatusMessage("❌ حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
        console.error("EmailJS Error:", error.text);
      },
    );
  };

  return (
    <section className="contact">
      {/* إدخال بيانات الـ SEO الخاصة بصفحة التواصل */}
      <Helmet>
        <title>اتصل بنا | مكتب المحاماة والاستشارات القانونية</title>
        <meta name="description" content="تواصل مع مكتبنا لحجز موعد استشارة قانونية متخصصة في قوانين التجارة الإلكترونية، الشركات الناشئة، وصياغة العقود." />
        <meta name="keywords" content="محامي، استشارة قانونية، حجز موعد محامي، صياغة عقود" />
      </Helmet>
      <div className="title__div">
        <h2 ><span>تواصل</span> معنا </h2>
        <p>
          نسعد باستقبال استفساراتك القانونية. املأ النموذج أدناه وسيقوم فريقنا بالرد عليك.
        </p>
      </div>

      <form ref={form} onSubmit={sendEmail} className="contact__form">
        
        <div className="form__group">
          <label>الاسم الكامل</label>
          <input 
            type="text" 
            name="user_name"
            required 
            placeholder="أدخل اسمك الكريم"
          />
        </div>

        <div className="form__group" >
          <label>رقم الهاتف</label>
          <input 
            type="tel" 
            name="user_phone"
            required 
          />
        </div>

        <div className="form__group">
          <label>البريد الإلكتروني (اختياري)</label>
          <input 
            type="email" 
            name="user_email" 
            placeholder="example@mail.com"
          />
        </div>

        <div className="form__group">
          <label>تفاصيل الاستشارة</label>
          <textarea 
            name="message" 
            required 
            rows="5"
            placeholder="اكتب نبذة مختصرة عن موضوع الاستشارة القانونية..."
          ></textarea>
        </div>

        {/* عرض رسالة النجاح أو الخطأ */}
        {statusMessage && (
          <div style={{ padding: "15px", marginBottom: "20px", borderRadius: "4px", backgroundColor: statusType === "success" ? "#d4edda" : "#f8d7da", color: statusType === "success" ? "#155724" : "#721c24" }}>
            {statusMessage}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
        </button>
      </form>
      
    </section>
  );
}
