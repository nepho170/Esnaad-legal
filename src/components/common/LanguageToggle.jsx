import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language || "en";

  const toggle = (lang) => {
    if (lang === current) return;
    i18n.changeLanguage(lang);
    localStorage.setItem("esnaad:lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    // update URL path: keep current path but replace leading /en or /ar
    const path = window.location.pathname;
    const newPath = path.replace(/^\/(en|ar)/, "");
    window.history.replaceState({}, "", `/${lang}${newPath}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Arabic"
        className={`px-3 py-1 rounded ${
          current === "ar"
            ? "bg-gold text-white"
            : "bg-transparent text-white/90"
        }`}
        onClick={() => toggle("ar")}
      >
        العربية
      </button>
      <button
        aria-label="English"
        className={`px-3 py-1 rounded ${
          current === "en"
            ? "bg-gold text-white"
            : "bg-transparent text-white/90"
        }`}
        onClick={() => toggle("en")}
      >
        English
      </button>
    </div>
  );
}
