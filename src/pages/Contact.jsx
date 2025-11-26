import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Download,
  MessageCircle,
} from "lucide-react";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
  const { t } = useTranslation();
  const { lng } = useParams();

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.addressTitle"),
      content: t("contact.addressContent"),
    },
    {
      icon: Phone,
      title: t("contact.phoneTitle"),
      content: t("contact.phoneContent"),
      links: [
        { type: "tel", value: "+97126222210", text: t("contact.phoneLink") },
      ],
    },
    {
      icon: Mail,
      title: t("contact.emailTitle"),
      content: t("contact.emailContent"),
      links: [
        {
          type: "mailto",
          value: "esnaaduae@gmail.com",
          text: t("contact.emailLink"),
        },
      ],
    },
    {
      icon: Clock,
      title: t("contact.hoursTitle"),
      content: t("contact.hoursContent"),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-stone-800/95 backdrop-blur-md text-white pt-60 pb-20 -mt-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-medium hover:shadow-large transition-shadow duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      <div className="text-gray-600 whitespace-pre-line">
                        {info.links
                          ? info.links.map((link, linkIndex) => (
                              <div key={linkIndex}>
                                <a
                                  href={`${link.type}:${link.value}`}
                                  className="text-gold hover:text-gold/80 transition-colors"
                                >
                                  {link.text}
                                </a>
                              </div>
                            ))
                          : info.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary to-primary/90 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                {t("contact.quickActions")}
              </h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/97126222210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  {t("contact.whatsapp")}
                </a>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-lg overflow-hidden shadow-medium">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("contact.location")}
                </h3>
              </div>
              <div className="h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58096.69181112679!2d54.285333778271536!3d24.483958672431246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e66650a1a555b%3A0x4f1feb9a80055619!2z2KfYs9mG2KfYryDZhNmE2KfYs9iq2LTYp9ix2KfYqiDYp9mE2YLYp9mG2YjZhtmK2Kkg2Ykg2KfZhNin2K_Yp9ix2YrYqSDZiCDYp9mE2YXZiNin2LHYryDYp9mE2KjYtNix2YrYqQ!5e0!3m2!1sen!2sus!4v1764153009218!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          {/* <div className="bg-light rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {lng === "ar"
                ? "شهادات الاعتماد"
                : "Certifications & Memberships"}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span>
                  {lng === "ar"
                    ? "نقابة المحامين الإماراتية"
                    : "UAE Bar Association"}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <span>
                  {lng === "ar" ? "استشاريون معتمدون" : "Certified Consultants"}
                </span>
              </div>
            </div>
          </div> */}

          {/* Remote Consultation CTA */}
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-8 text-white text-center mt-12">
            <div className="max-w-3xl mx-auto">
              <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">
                {t("contact.remoteConsultationTitle")}
              </h3>
              <p className="text-lg mb-6 opacity-90">
                {t("contact.remoteConsultationSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`/${lng}/consultation`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("contact.startConsultation")}
                </a>
                <a
                  href={`tel:+97126222210`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t("contact.callNow")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
