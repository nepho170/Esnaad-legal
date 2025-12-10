import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  User,
  Award,
  Calendar,
  CheckCircle,
  Shield,
  Users,
  Globe,
  Briefcase,
  Scale,
  Target,
  Eye,
  Star,
} from "lucide-react";
import img from "/images/history-section.png";

export default function About() {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();
  const currentLang = i18n.language || "en";

  // const teamCredentials = [
  //   {
  //     titleKey: "about.team.credentials.lawyers",
  //   },
  //   {
  //     titleKey: "about.team.credentials.accredited",
  //   },
  //   {
  //     titleKey: "about.team.credentials.expertise",
  //   },
  //   {
  //     titleKey: "about.team.credentials.competence",
  //   },
  // ];

  const whyChooseUs = [
    {
      icon: Users,
      titleKey: "about.whyChoose.reasons.experienced.title",
      descKey: "about.whyChoose.reasons.experienced.description",
    },
    {
      icon: Shield,
      titleKey: "about.whyChoose.reasons.comprehensive.title",
      descKey: "about.whyChoose.reasons.comprehensive.description",
    },
    {
      icon: CheckCircle,
      titleKey: "about.whyChoose.reasons.confidentiality.title",
      descKey: "about.whyChoose.reasons.confidentiality.description",
    },
    {
      icon: Star,
      titleKey: "about.whyChoose.reasons.transparent.title",
      descKey: "about.whyChoose.reasons.transparent.description",
    },
    {
      icon: Award,
      titleKey: "about.whyChoose.reasons.proven.title",
      descKey: "about.whyChoose.reasons.proven.description",
    },
    {
      icon: Globe,
      titleKey: "about.whyChoose.reasons.bilingual.title",
      descKey: "about.whyChoose.reasons.bilingual.description",
    },
  ];

  const stats = [
    { number: "2014", labelKey: "about.stats.founded", icon: Calendar },
    { number: "11+", labelKey: "about.stats.experience", icon: Award },
    { number: "200+", labelKey: "about.stats.clients", icon: Users },
    { number: "10", labelKey: "about.stats.government", icon: Target },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-stone-800/95 backdrop-blur-md text-white pt-60 pb-20 -mt-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t("about.title")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                {t("about.ourStory.title")}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{t("about.ourStory.paragraph1")}</p>
                <p>{t("about.ourStory.paragraph2")}</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-medium text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-6">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {t("about.founder.name")}
                    </h3>
                    <p className="text-white/90">
                      {t("about.founder.position")}
                    </p>
                  </div>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">
                  {t("about.founder.description")}
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  {t("about.founder.qualifications")}
                </h4>
                <ul className="space-y-2">
                  {t("about.founder.degrees", { returnObjects: true }).map(
                    (qual, index) => (
                      <li
                        key={index}
                        className="flex items-center text-white/90"
                      >
                        <CheckCircle className="w-4 h-4 mr-3 text-gold flex-shrink-0" />
                        {qual}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose Esnaad */}
      <section
        className="relative py-20 w-full parallax-bg"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12 text-center">
            {t("about.whyChoose.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div
                key={index}
                className="backdrop-blur-sm rounded-lg p-6 shadow-medium hover:shadow-large transition-shadow duration-300"
                style={{ backgroundColor: "rgba(245, 242, 233, 0.85)" }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t(reason.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(reason.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* Responsibility to Clients */}
        <section className="mb-20">
          <div className="bg-light rounded-xl p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                {t("about.responsibility.title")}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-4 sm:p-8 shadow-medium">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4 sm:mr-6 flex-shrink-0">
                    <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      {t("about.responsibility.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">
              {t("about.cta.title")}
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`/${lng}/contact`}
                className="px-8 py-3 bg-gold hover:bg-gold/90 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {t("about.cta.contact")}
              </a>
              <a
                href={`/${lng}/consultation`}
                className="px-8 py-3 border-2 border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {t("about.cta.consultation")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
