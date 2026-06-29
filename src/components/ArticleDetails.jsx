import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function ArticleDetail() {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`articles/${id}/`)
      .then((response) => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("حدث خطأ في جلب تفاصيل المقال:", error);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-DZ', options);
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px", fontSize: "1.2rem" }}>جاري تحميل نص المقال...</div>;
  }

  if (!article) {
    return <div style={{ textAlign: "center", padding: "50px", fontSize: "1.2rem", color: "#e74c3c" }}>عذراً، المقال غير موجود أو تم حذفه.</div>;
  }

  return (
    <div className="article-detail__page" style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* زر العودة لخلفية المقالات */}
      <Link to="/articles" style={{ textDecoration: "none", color: "#FE7F2D", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "5px", marginBottom: "30px" }}>
        <i className="ri-arrow-right-line"></i> العودة إلى قائمة المقالات
      </Link>

      <article>
        <h1 style={{ color: "#2c3e50", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: "15px", lineHeight: "1.4" }}>
          {article.title}
        </h1>

        <div style={{ fontSize: "0.9rem", color: "#95a5a6", marginBottom: "30px", display: "flex", gap: "15px" }}>
          <span><i className="ri-calendar-line"></i> {article.created_at ? formatDate(article.created_at) : "تاريخ غير محدد"}</span>
        </div>

        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            style={{ width: "100%", maxHeight: "450px", objectFit: "cover", borderRadius: "8px", marginBottom: "30px" }}
          />
        )}

        {/* عرض المحتوى الكامل للمقال مع الحفاظ على الفواصل والأسطر المتعددة */}
        <div className="article__content" style={{ 
          color: "#34495e", 
          fontSize: "1.15rem", 
          lineHeight: "1.8", 
          whiteSpace: "pre-line", 
          textAlign: "justify" 
        }}>
          {article.content}
        </div>
      </article>
    </div>
  );
}