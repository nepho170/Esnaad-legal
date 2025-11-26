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
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brown-900/40 via-brown-800/30 to-stone-900/40"></div>

      {/* Main content container */}
      <div
        // 1. MOBILE/DEFAULT: Full width, symmetric padding (px-8)
        // 2. DESKTOP (md:): Revert to original left positioning (left-16/left-24) and remove symmetric padding (!px-0)
        className="absolute bottom-12 w-full px-8 z-10 
                   md:left-16 lg:left-24 md:!px-0 
                   max-w-2xl"
      >
        {/* Title and Subtitle remain the same */}
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

        {/* Button container */}
        <div
          className={`flex flex-col sm:flex-row gap-4 w-full ${
            lng === "ar" ? "sm:justify-end" : "sm:justify-start"
          }`}
        >
          {/* CTA 1 */}
          <a
            href="#services"
            // MOBILE: w-full and centered text/margin (mx-auto).
            // DESKTOP (sm:): Revert to specific width (!w-auto) and remove center margin (!mx-0) to align left.
            className="w-full text-center mx-auto px-8 py-4 bg-primary hover:bg-brown-600 text-beige-50 rounded font-medium transition-all duration-300 min-w-[180px] shadow-lg hover:shadow-xl
                       sm:w-auto sm:!mx-0"
          >
            {t("hero.cta1")}
          </a>

          {/* CTA 2 */}
          <Link
            to={`/${currentLang}/consultation`}
            // MOBILE: w-full and centered text/margin (mx-auto).
            // DESKTOP (sm:): Revert to specific width (!w-auto) and remove center margin (!mx-0) to align left.
            className="w-full text-center mx-auto px-8 py-4 border-2 border-beige-200/30 bg-beige-100/10 hover:bg-beige-100/20 hover:border-beige-200/50 rounded font-medium transition-all duration-300 min-w-[180px]
                       sm:w-auto sm:!mx-0"
          >
            {t("hero.cta2")}
          </Link>
        </div>
      </div>
    </section>
  );
}
