import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("practice-areas/")
      .then((response) => {
        setPracticeAreas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("حدث خطأ في جلب البيانات", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>الرئيسية | مكتب المحاماة والاستشارات القانونية</title>
        <meta
          name="description"
          content="تواصل مع مكتبنا لحجز موعد استشارة قانونية متخصصة في قوانين التجارة الإلكترونية، الشركات الناشئة، وصياغة العقود."
        />
        <meta
          name="keywords"
          content="محامي، استشارة قانونية، حجز موعد محامي، صياغة عقود"
        />
      </Helmet>

      {/* إضافة وسم main لحل مشكلة الـ Accessibility وضمان تمييز المحتوى الرئيسي للمتصفح */}
      <main>
        <div className="hero__section">
          <section>
            <div className="left__content">
              <h2>
                نحمي <span>حقوقك</span> بقوة <span>القانون،</span> وخبرة السنين.
              </h2>
              <p>
                نقدم حلولاً واستشارات قانونية متكاملة للأفراد والشركات. نحن هنا
                لنحمل عنك العبء القانوني، وندافع عن مصالحك باحترافية وسرية تامة
                لضمان راحة بالك. نستند في عملنا إلى سنوات من الخبرة العميقة والفهم
                الدقيق لتشريعات القوانين المختلفة. غايتنا الأولى هي تحقيق العدالة،
                واسترداد حقوقك بأعلى كفاءة وأسرع وقت ممكن.
              </p>
              <div className="hero__btns">
                <Link to="/appointement">
                  <button className="hero__btn1">طلب استشارة</button>
                </Link>
                <Link to="/articles">
                  <button className="hero__btn2"> المقالات </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
        
        <div className="devider"></div>

        <section className="area__section">
          <div className="area__headers">
            <h2>
              تخصصاتنا <span>القانونية</span>
            </h2>
            <p>
              تعرف على أبرز المجالات التي نقدم فيها خبراتنا الاستشارية والقانونية
            </p>
          </div>

          {/* هنا قمنا بإنشاء هيكل ثابت للكروت (Skeleton) بدلاً من جملة نصية تعطل انطباع المتصفح */}
          {loading ? (
            <div className="area__container">
              {[1, 2, 3].map((item) => (
                <div className="area__card skeleton__card" key={item} style={{ opacity: 0.6, background: '#f5f5f5', minHeight: '180px' }}>
                  <div style={{ height: '20px', background: '#e0e0e0', margin: '10px 0', width: '40%' }}></div>
                  <div style={{ height: '14px', background: '#e0e0e0', margin: '5px 0', width: '85%' }}></div>
                  <div style={{ height: '14px', background: '#e0e0e0', margin: '5px 0', width: '70%' }}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="area__container">
              {practiceAreas.map((area) => (
                <div className="area__card" key={area.id}>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>

                  <span className="span1">
                    <i className="ri-scales-3-line"></i>
                  </span>
                  <span className="span2">
                    <i className="ri-auction-fill"></i>
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}