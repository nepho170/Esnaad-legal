import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import heroImage from "/images/hero-section.png";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();
  const currentLang = i18n.language || "en";
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing");
  const [index, setIndex] = useState(0);
  const [pauseCounter, setPauseCounter] = useState(0);
  const fullText = t("hero.title");

  useEffect(() => {
    setDisplayText("");
    setPhase("typing");
    setIndex(0);
    setPauseCounter(0);
  }, [fullText]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (phase === "typing") {
        if (index < fullText.length) {
          setDisplayText(fullText.slice(0, index + 1));
          setIndex(index + 1);
        } else {
          setPhase("pausing");
          setPauseCounter(0);
        }
      } else if (phase === "pausing") {
        if (pauseCounter < 20) {
          // 20 * 100ms = 2 seconds
          setPauseCounter(pauseCounter + 1);
        } else {
          setPhase("erasing");
        }
      } else if (phase === "erasing") {
        if (index > 0) {
          setDisplayText(fullText.slice(0, index - 1));
          setIndex(index - 1);
        } else {
          setPhase("typing");
        }
      }
    }, 100);
    return () => clearInterval(timer);
  }, [phase, index, pauseCounter, fullText]);

  return (
    <section
      className="h-screen flex items-center justify-center text-white relative bg-cover bg-center bg-no-repeat -mt-32"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brown-900/40 via-brown-800/30 to-stone-900/40"></div>

      {/* Main content container */}
      <div
        className={`absolute bottom-12 w-full px-8 z-10 
                   ${
                     lng === "ar"
                       ? "md:right-0 md:px-0 md:pr-16 lg:pr-24"
                       : "md:left-16 lg:left-24 md:!px-0 max-w-2xl"
                   }`}
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
          {displayText}
          <span className="animate-pulse">|</span>
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
          className={`flex flex-col sm:flex-row gap-4 w-full sm:justify-start`}
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
