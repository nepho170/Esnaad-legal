import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Award,
  MessageSquare,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { allServices } from "../../utils/constants";

export default function ServiceDetail() {
  const { lng, serviceId } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || "en";

  const service = allServices.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentLang === "ar" ? "الخدمة غير موجودة" : "Service Not Found"}
          </h1>
          <Link
            to={`/${lng}/services`}
            className="text-gold hover:text-gold/80"
          >
            {currentLang === "ar" ? "العودة إلى الخدمات" : "Back to Services"}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = LucideIcons[service.icon];
  const title = currentLang === "ar" ? service.titleAr : service.titleEn;
  const details = currentLang === "ar" ? service.detailsAr : service.detailsEn;

  // Get related services (same category, excluding current)
  const relatedServices = allServices
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <Link to={`/${lng}`} className="hover:text-gold">
              {currentLang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link to={`/${lng}/services`} className="hover:text-gold">
              {currentLang === "ar" ? "الخدمات" : "Services"}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-8 text-white mb-8">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-6">
                  {Icon && <Icon className="w-8 h-8 text-white" />}
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold">{title}</h1>
                  <p className="text-white/90 mt-2">
                    {currentLang === "ar"
                      ? service.descriptionAr
                      : service.descriptionEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {currentLang === "ar" ? "نظرة عامة" : "Overview"}
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-medium">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {details.description}
                </p>
              </div>
            </section>

            {/* What We Offer */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {currentLang === "ar" ? "ما نقدمه" : "What We Offer"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.whatWeOffer.map((offer, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-light rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-teal mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{offer}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {currentLang === "ar" ? "عمليتنا" : "Our Process"}
              </h2>
              <div className="space-y-4">
                {details.process.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start p-6 bg-white rounded-lg shadow-small"
                  >
                    <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {currentLang === "ar" ? "لماذا تختارنا" : "Why Choose Us"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.whyChooseUs.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-gradient-to-br from-gold/10 to-gold/5 rounded-lg border border-gold/20"
                  >
                    <Award className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">{reason}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Consultation CTA */}
            <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-6 text-white mb-8">
              <h3 className="text-xl font-semibold mb-4">
                {currentLang === "ar" ? "احجز استشارة" : "Book Consultation"}
              </h3>
              <p className="text-white/90 mb-6">
                {currentLang === "ar"
                  ? "احصل على استشارة قانونية متخصصة في هذا المجال"
                  : "Get specialized legal consultation in this area"}
              </p>
              <Link
                to={`/${lng}/consultation`}
                className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block text-center"
              >
                {currentLang === "ar" ? "ابدأ الاستشارة" : "Start Consultation"}
              </Link>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg p-6 shadow-medium mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLang === "ar"
                  ? "معلومات الاتصال"
                  : "Contact Information"}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-3" />
                  <span className="text-gray-600 text-sm">
                    {currentLang === "ar"
                      ? "رد سريع خلال 24 ساعة"
                      : "Quick response within 24 hours"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-primary mr-3" />
                  <span className="text-gray-600 text-sm">
                    {currentLang === "ar" ? "فريق متخصص" : "Specialized team"}
                  </span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-primary mr-3" />
                  <span className="text-gray-600 text-sm">
                    {currentLang === "ar"
                      ? "استشارة مجانية أولى"
                      : "Free initial consultation"}
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  to={`/${lng}/contact`}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-block text-center text-sm"
                >
                  {currentLang === "ar" ? "اتصل بنا" : "Contact Us"}
                </Link>
              </div>
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="bg-light rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentLang === "ar" ? "خدمات ذات صلة" : "Related Services"}
                </h3>
                <div className="space-y-3">
                  {relatedServices.map((relatedService) => {
                    const RelatedIcon = LucideIcons[relatedService.icon];
                    return (
                      <Link
                        key={relatedService.id}
                        to={`/${lng}/services/${relatedService.id}`}
                        className="flex items-center p-3 bg-white rounded-lg hover:shadow-medium transition-shadow duration-200"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          {RelatedIcon && (
                            <RelatedIcon className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <span className="text-gray-700 hover:text-primary transition-colors text-sm">
                          {currentLang === "ar"
                            ? relatedService.titleAr
                            : relatedService.titleEn}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            {currentLang === "ar" ? (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                العودة
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </>
            )}
          </button>

          <Link
            to={`/${lng}/services`}
            className="text-gold hover:text-gold/80 transition-colors"
          >
            {currentLang === "ar" ? "عرض جميع الخدمات" : "View All Services"}
          </Link>
        </div>
      </div>
    </div>
  );
}
