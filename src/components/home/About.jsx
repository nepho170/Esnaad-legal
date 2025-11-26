import React from "react";
import { useTranslation } from "react-i18next";
import { Eye, Target } from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="bg-light rounded-xl p-8 shadow-medium hover:shadow-large transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-primary">
                {t("vision.title")}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t("vision.content")}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-8 shadow-medium hover:shadow-large transition-shadow duration-300 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-semibold">
                {t("message.title")}
              </h2>
            </div>
            <p className="text-white/90 leading-relaxed text-lg">
              {t("message.content")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
