import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language || "en";

  const toggle = () => {
    const newLang = current === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("esnaad:lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang === "ar" ? "ar" : "en";
    // update URL path: keep current path but replace leading /en or /ar
    const path = window.location.pathname;
    const newPath = path.replace(/^\/(en|ar)/, "");
    window.history.replaceState({}, "", `/${newLang}${newPath}`);
  };

  return (
    <button
      aria-label={`Switch to ${current === "en" ? "Arabic" : "English"}`}
      className="px-3 py-1 bg-gold text-white rounded hover:bg-yellow-600 transition-colors duration-200"
      onClick={toggle}
    >
      {current === "en" ? "English" : "العربية"}
    </button>
  );
}
