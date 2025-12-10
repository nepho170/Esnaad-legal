import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { services } from "../../utils/constants";
import * as LucideIcons from "lucide-react";

function ServiceCard({ service, language }) {
  const Icon = LucideIcons[service.icon];
  const title = language === "ar" ? service.titleAr : service.titleEn;
  const description =
    language === "ar" ? service.descriptionAr : service.descriptionEn;
  const cardRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);
  React.useEffect(() => {
    if (!cardRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={cardRef}
      className={`group bg-beige-50 hover:bg-white rounded-xl shadow-small hover:shadow-large transition-all duration-700 hover:-translate-y-2 border border-beige-200 hover:border-primary/30 w-[280px] h-[280px] flex-shrink-0 flex flex-col relative ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="w-full h-full transition-transform duration-700"
        style={{
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full bg-beige-50 rounded-xl p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            {Icon && <Icon className="w-8 h-8 text-primary" />}
          </div>
          <h3 className="text-lg font-semibold text-dark text-center">
            {title}
          </h3>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-xl p-6 flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="text-lg font-semibold text-primary mb-3 flex-shrink-0">
            {title}
          </h3>
          <p className="text-brown-700 mb-4 leading-relaxed flex-grow text-sm">
            {description}
          </p>
          <Link
            to={`/${language}/services/${service.id}`}
            className="text-gold hover:text-gold/80 font-medium flex items-center hover:translate-x-1 transition-transform duration-200 flex-shrink-0 mt-auto"
          >
            {language === "ar" ? "اقرأ المزيد" : "Learn More"}
            <LucideIcons.ArrowRight
              className={`w-4 h-4 ml-2 ${
                language === "ar" ? "rotate-180" : ""
              }`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  return (
    <section id="services" className="py-20 bg-warm-gradient">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-brown-700 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Mobile: Horizontal scroll only, Desktop: Grid */}
        <div
          className="md:hidden overflow-x-auto pb-4"
          style={{ overflowY: "hidden" }}
        >
          <div className="flex gap-4 px-4 -mx-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                language={currentLang}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              language={currentLang}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={`/${i18n.language || "en"}/services`}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            {currentLang === "ar" ? "عرض جميع الخدمات" : "View All Services"}
          </Link>
        </div>
      </div>
    </section>
  );
}
