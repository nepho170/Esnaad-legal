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
    <Link
      ref={cardRef}
      to={`/${language}/services/${service.id}`}
      className={`group bg-beige-50 hover:bg-white rounded-xl p-6 shadow-small hover:shadow-large transition-all duration-300 hover:-translate-y-2 border border-beige-200 hover:border-primary/30 w-[280px] h-[280px] flex-shrink-0 flex flex-col opacity-100 translate-y-0`}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-primary/10 group-hover:bg-gold/20 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300">
          {Icon && (
            <Icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
          )}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-dark mb-3 group-hover:text-primary transition-colors duration-300 flex-shrink-0">
        {title}
      </h3>
      <p className="text-brown-700 mb-4 leading-relaxed flex-grow line-clamp-4 text-sm">
        {description}
      </p>
      <div className="text-gold hover:text-gold/80 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 mt-auto">
        {language === "ar" ? "اقرأ المزيد" : "Learn More"}
        <LucideIcons.ArrowRight
          className={`w-4 h-4 ml-2 ${language === "ar" ? "rotate-180" : ""}`}
        />
      </div>
    </Link>
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

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="md:hidden overflow-x-auto pb-4">
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
