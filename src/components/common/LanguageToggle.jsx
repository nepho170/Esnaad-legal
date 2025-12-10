import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const current = i18n.language || "en";

  const toggle = () => {
    const newLang = current === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("esnaad:lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang === "ar" ? "ar" : "en";

    // Get current path without language prefix
    const pathWithoutLang = location.pathname.replace(/^\/(en|ar)/, "");

    // Navigate to the new language path
    navigate(`/${newLang}${pathWithoutLang}`, { replace: true });
  };

  return (
    <button
      aria-label={`Switch to ${current === "en" ? "Arabic" : "English"}`}
      className="px-3 py-1 bg-gold text-white rounded hover:bg-yellow-600 transition-colors duration-200"
      onClick={toggle}
    >
      {current === "en" ? "العربية" : "English"}
    </button>
  );
}
