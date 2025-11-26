import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const { lng } = useParams();
  const lang = lng || "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(26,58,82,0.95)] h-20 shadow-lg"
          : "bg-[rgba(26,58,82,0.8)] h-24 backdrop-blur-sm"
      } `}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <Link
            to={`/${lang}`}
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/images/esnaad-logo.png"
              alt="Esnaad Legal Consultancy"
              className="h-20 w-auto"
            />
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link to={`/${lang}`} className="hover:text-gold">
              {t("header.home")}
            </Link>
            <Link to={`/${lang}/services`} className="hover:text-gold">
              {t("header.services")}
            </Link>
            <Link to={`/${lang}/about`} className="hover:text-gold">
              {t("header.about")}
            </Link>
            <Link to={`/${lang}/consultation`} className="hover:text-gold">
              {t("header.consultation")}
            </Link>
            <Link to={`/${lang}/contact`} className="hover:text-gold">
              {t("header.contact")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+97126222210"
            className="hidden sm:inline-block px-3 py-2 bg-white/10 rounded hover:bg-white/20"
          >
            +971 2 622 2210
          </a>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
