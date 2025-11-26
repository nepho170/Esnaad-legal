import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();
  const currentLang = i18n.language || "en";

  return (
    <section
      className="min-h-screen flex items-center justify-center text-white relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-section.webp')" }}
    >
      {/* Dark transparent overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 ${
            lng === "ar" ? "font-medium" : ""
          }`}
        >
          {t("hero.title")}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            className="px-8 py-4 bg-gold hover:bg-gold/90 text-white rounded-lg font-semibold transition-colors duration-200 min-w-[180px]"
          >
            {t("hero.cta1")}
          </a>
          <Link
            to={`/${currentLang}/consultation`}
            className="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-lg font-semibold transition-colors duration-200 min-w-[180px]"
          >
            {t("hero.cta2")}
          </Link>
        </div>
      </div>
    </section>
  );
}
