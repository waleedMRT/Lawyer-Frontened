import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Helmet } from "react-helmet-async";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("articles/")
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("حدث خطأ في جلب المقالات:", error);
        setLoading(false);
      });
  }, []);

  // دالة بسيطة لتنسيق التاريخ ليظهر بشكل مقروء
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-DZ', options);
  };

  return (
    <div className="articles__page" style={{ maxWidth: "1200px", margin: "0 auto" }}>

      
      
      {/* رأس الصفحة */}
      <div className="articles__header" style={{ textAlign: "center", marginBottom: "50px" }}>
        <h2 style={{ color: "#233D4D", fontSize: "clamp(1.5rem, 5vw, 2.5rem)", marginBottom: "10px" }}>
          <span>المقالات</span> القانونية والتبسيطية
        </h2>
        <p style={{ color: "#7f8c8d", fontSize: "clamp(.8rem , 1.5vw , 1rem)" }}>
          نشارككم معرفتنا وخبرتنا القانونية من خلال مقالات تهم الأفراد والشركات لتوعيتهم بحقوقهم.
        </p>
      </div>

      {/* فحص حالة التحميل */}
      {loading ? (
        <div style={{ textAlign: "center", fontSize: "1.2rem", color: "#2c3e50" }}>
          جاري تحميل المقالات الثمينة...
        </div>
      ) : articles.length === 0 ? (
        <div style={{ textAlign: "center", fontSize: "1.2rem", color: "#7f8c8d" }}>
          لا توجد مقالات منشورة حالياً.
        </div>
      ) : (
        /* شبكة عرض المقالات */
        <div className="articles__grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
          gap: "30px" 
        }}>
          {articles.map((article) => (
            <article key={article.id} className="article__card" style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #eceff1"
            }}>
              
              {/* إذا كان المقال يحتوي على صورة من قاعدة البيانات */}
              {article.image && (
                <div className="article__image-wrapper" style={{ height: "200px", overflow: "hidden" }}>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* محتوى كارت المقال */}
              <div className="article__body" style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                
                {/* تاريخ المقال باستخدام أيقونة Remix Icon */}
                <div className="article__meta" style={{ fontSize: "0.85rem", color: "#95a5a6", marginBottom: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
                  <i className="ri-calendar-line"></i>
                  <span>{article.created_at ? formatDate(article.created_at) : "تاريخ غير محدد"}</span>
                </div>

                <h3 style={{ color: "#233D4D", fontSize: "clamp(1rem, 3vw, 1.5rem)", marginBottom: "12px", lineHeight: "1.4" }}>
                  {article.title}
                </h3>

                {/* مقتطف أو وصف مختصر للمقال */}
                <p style={{ color: "#555", fontSize: "clamp(.8rem , 1.5vw , 1rem)", lineHeight: "1.6", marginBottom: "20px", flexGrow: 1 }}>
                  {article.summary || (article.content && article.content.substring(0, 120) + "...")}
                </p>

                {/* رابط الانتقال للمقال الكامل */}
                <Link to={`/articles/${article.id}`} style={{ 
                  textDecoration: "none", 
                  color: "#FE7F2D", 
                  fontWeight: "bold",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "auto"
                }}>
                  اقرأ المقال بالكامل 
                  <i className="ri-arrow-left-line" style={{ fontSize: "1.1rem" }}></i>
                </Link>

              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}