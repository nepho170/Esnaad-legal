import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import esnaadLogo from "/images/esnaad-logo.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { lng } = useParams();
  const lang = lng || "en";
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage =
    location.pathname === `/${lang}` || location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-stone-800/95 backdrop-blur-md h-24"
          : "bg-transparent h-32"
      } `}
    >
      <div
        className={`max-w-6xl mx-auto px-4 h-full flex items-center justify-between transition-all duration-500 ${
          !scrolled && isHomePage ? "text-white drop-shadow-lg" : "text-white"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            to={`/${lang}`}
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <div className="flex items-center gap-3">
              <img
                src={esnaadLogo}
                alt="Esnaad Legal Consultancy"
                className="h-24 w-auto"
              />
              <div className="hidden lg:block">
                <div className="text-xl font-serif font-bold tracking-wide">
                  ESNAAD LEGAL
                </div>
                <div className="text-sm font-light tracking-widest opacity-90">
                  CONSULTANCY
                </div>
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link to={`/${lang}`}>{t("header.home")}</Link>
            <Link to={`/${lang}/services`}>{t("header.services")}</Link>
            <Link to={`/${lang}/about`}>{t("header.about")}</Link>
            <Link to={`/${lang}/consultation`}>{t("header.consultation")}</Link>
            <Link to={`/${lang}/contact`}>{t("header.contact")}</Link>
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

          {/* Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-stone-800/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-6 space-y-4">
          <Link
            to={`/${lang}`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-gold transition-colors duration-200 py-2"
          >
            {t("header.home")}
          </Link>
          <Link
            to={`/${lang}/services`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-gold transition-colors duration-200 py-2"
          >
            {t("header.services")}
          </Link>
          <Link
            to={`/${lang}/about`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-gold transition-colors duration-200 py-2"
          >
            {t("header.about")}
          </Link>
          <Link
            to={`/${lang}/consultation`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-gold transition-colors duration-200 py-2"
          >
            {t("header.consultation")}
          </Link>
          <Link
            to={`/${lang}/contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-gold transition-colors duration-200 py-2"
          >
            {t("header.contact")}
          </Link>
          <div className="pt-4 border-t border-white/20">
            <a
              href="tel:+97126222210"
              className="block text-white hover:text-gold transition-colors duration-200 py-2"
            >
              +971 2 622 2210
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
