import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { allServices } from "../utils/constants";
import * as LucideIcons from "lucide-react";
import { Filter, ArrowRight } from "lucide-react";

function ServiceCard({ service, currentLang }) {
  const Icon = LucideIcons[service.icon];
  const title = currentLang === "ar" ? service.titleAr : service.titleEn;
  const description =
    currentLang === "ar" ? service.descriptionAr : service.descriptionEn;

  return (
    <Link
      to={`/${currentLang}/services/${service.id}`}
      className="group bg-white rounded-xl p-6 shadow-small hover:shadow-large transition-all duration-300 hover:-translate-y-1 border border-gray-100 block"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-primary/10 group-hover:bg-gold/10 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300">
          {Icon && (
            <Icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-1">
            {title}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              service.category === "legal"
                ? "bg-blue-100 text-blue-800"
                : service.category === "financial"
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {service.category === "legal"
              ? currentLang === "ar"
                ? "قانونية"
                : "Legal"
              : service.category === "financial"
              ? currentLang === "ar"
                ? "مالية"
                : "Financial"
              : currentLang === "ar"
              ? "إدارية"
              : "Administrative"}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

      <div className="flex items-center text-gold group-hover:text-gold/80 font-medium group-hover:translate-x-1 transition-all duration-200">
        {currentLang === "ar" ? "اقرأ المزيد" : "Learn More"}
        <ArrowRight
          className={`w-4 h-4 ml-2 ${currentLang === "ar" ? "rotate-180" : ""}`}
        />
      </div>
    </Link>
  );
}

export default function Services() {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();
  const currentLang = i18n.language || "en";
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { key: "all", labelEn: "All Services", labelAr: "جميع الخدمات" },
    { key: "legal", labelEn: "Legal Services", labelAr: "الخدمات القانونية" },
    {
      key: "financial",
      labelEn: "Financial Services",
      labelAr: "الخدمات المالية",
    },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? allServices
      : allServices.filter((service) => service.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-stone-800/95 backdrop-blur-md text-white pt-60 pb-20 -mt-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {currentLang === "ar" ? "خدماتنا" : "Our Services"}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            {currentLang === "ar"
              ? "نقدم مجموعة شاملة من الخدمات القانونية والإدارية لتلبية احتياجاتك"
              : "We provide a comprehensive range of legal and administrative services to meet your needs"}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Category Filter */}
        {/* <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <Filter className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-gray-700 font-medium">
              {currentLang === "ar"
                ? "تصنيف حسب الفئة:"
                : "Filter by category:"}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? "bg-primary text-white shadow-medium"
                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-small hover:shadow-medium"
                }`}
              >
                {currentLang === "ar" ? category.labelAr : category.labelEn}
              </button>
            ))}
          </div>
        </div> */}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              currentLang={currentLang}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {currentLang === "ar"
                ? "لا توجد خدمات في هذه الفئة"
                : "No services found in this category"}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">
            {currentLang === "ar"
              ? "هل تحتاج استشارة قانونية؟"
              : "Need Legal Consultation?"}
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {currentLang === "ar"
              ? "فريقنا من الخبراء القانونيين جاهز لمساعدتك. احجز استشارة الآن واحصل على الحل المناسب لقضيتك."
              : "Our team of legal experts is ready to help you. Book a consultation now and get the right solution for your case."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/${currentLang}/consultation`}
              className="px-8 py-3 bg-gold hover:bg-gold/90 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {currentLang === "ar" ? "احجز استشارة" : "Book Consultation"}
            </Link>
            <Link
              to={`/${currentLang}/contact`}
              className="px-8 py-3 border-2 border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {currentLang === "ar" ? "اتصل بنا" : "Contact Us"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
