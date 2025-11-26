import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import heroImage from "/images/hero-section.png";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();
  const currentLang = i18n.language || "en";

  return (
    <section
      className="h-screen flex items-center justify-center text-white relative bg-cover bg-center bg-no-repeat -mt-32"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Reduced warm overlay to show more of the courthouse image */}
      <div className="absolute inset-0 bg-gradient-to-r from-brown-900/40 via-brown-800/30 to-stone-900/40"></div>

      {/* Main content positioned at bottom-left like BridgePoint reference */}
      <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 max-w-2xl z-10">
        <h1
          className={`text-4xl md:text-4xl lg:text-6xl font-bold tracking-wide mb-4 leading-tight ${
            lng === "ar" ? "font-bold text-right" : "font-bold"
          }`}
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          {t("hero.title")}
        </h1>
        <p
          className={`text-lg md:text-xl mb-8 leading-relaxed font-light ${
            lng === "ar" ? "text-right" : ""
          }`}
        >
          {t("hero.subtitle")}
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 ${
            lng === "ar" ? "justify-end" : ""
          }`}
        >
          <a
            href="#services"
            className="px-8 py-4 bg-primary hover:bg-brown-600 text-beige-50 rounded font-medium transition-all duration-300 min-w-[180px] shadow-lg hover:shadow-xl"
          >
            {t("hero.cta1")}
          </a>
          <Link
            to={`/${currentLang}/consultation`}
            className="px-8 py-4 border-2 border-beige-200/30 bg-beige-100/10 hover:bg-beige-100/20 hover:border-beige-200/50 rounded font-medium transition-all duration-300 min-w-[180px]"
          >
            {t("hero.cta2")}
          </Link>
        </div>
      </div>
    </section>
  );
}
