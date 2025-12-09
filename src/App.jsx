import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  Outlet,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./components/services/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ConsultationSystem from "./pages/ConsultationSystem";

function LanguageOutlet() {
  const { lng } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = lng || "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
  }, [lng, i18n]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Esnaad-legal">
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path=":lng" element={<LanguageOutlet />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="consultation" element={<ConsultationSystem />} />
        </Route>
        {/* Fallback to English */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
