import React from "react";
import { sectors } from "../../utils/constants";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function SectorCard({ sector, language, index }) {
  const Icon = LucideIcons[sector.icon];
  const title = language === "ar" ? sector.titleAr : sector.titleEn;
  const examples = language === "ar" ? sector.examplesAr : sector.examples;
  const { t } = useTranslation();
  const { lang } = useParams();
  return (
    <motion.div
      className="group relative bg-white p-8 border-l-4 border-primary/20 hover:border-gold shadow-sm hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ x: 8 }}
    >
      <div className="flex items-start space-x-6">
        {/* Icon */}
        <motion.div
          className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {Icon && (
            <Icon className="w-8 h-8 text-primary group-hover:text-gold transition-colors duration-300" />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {examples.map((example, exampleIndex) => (
              <motion.div
                key={exampleIndex}
                className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15 + exampleIndex * 0.1,
                  duration: 0.4,
                }}
              >
                <span className="w-1.5 h-1.5 bg-teal rounded-full mr-3 flex-shrink-0" />
                {example}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AchievementItem({ item, index }) {
  return (
    <motion.div
      className="flex items-center py-4 border-b border-gray-100 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
        {index + 1}
      </div>
      <p className="text-gray-700 flex-1">{item}</p>
    </motion.div>
  );
}

export default function Sectors() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Clean Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-heading font-bold text-primary mb-4">
            {t("sectors.title")}
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sectors List - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {sectors.map((sector, index) => (
                <SectorCard
                  key={sector.id}
                  sector={sector}
                  language={currentLang}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Achievements Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-lg p-8 shadow-lg sticky top-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                  <LucideIcons.Award className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary">
                  {t("sectors.achievements.title")}
                </h3>
              </div>

              <div className="space-y-0">
                {(() => {
                  try {
                    const items = t("sectors.achievements.items", {
                      returnObjects: true,
                    });
                    // Ensure items is an array
                    if (Array.isArray(items)) {
                      return items.map((item, index) => (
                        <AchievementItem
                          key={index}
                          item={item}
                          index={index}
                        />
                      ));
                    }
                    // Fallback if not an array
                    return [];
                  } catch (error) {
                    console.error("Error loading achievements:", error);
                    return [];
                  }
                })()}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
