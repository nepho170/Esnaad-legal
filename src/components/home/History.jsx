import React from "react";
import { useTranslation } from "react-i18next";
import { Calendar, User, Award } from "lucide-react";
import { motion } from "framer-motion";
import img from "/images/history-section.png";

export default function History() {
  const { t } = useTranslation();

  const milestones = [
    {
      year: "2013",
      title: t("history.founded"),
      description: t("history.description"),
      icon: Calendar,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const founderVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const milestoneVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="py-20 bg-white relative parallax-bg"
      style={{
        backgroundImage: `url(${img})`,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            style={{ color: "#ffffff" }}
          >
            {t("history.title")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={timelineVariants}>
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            ></motion.div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative flex items-start mb-8"
                variants={milestoneVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="w-16 h-16 bg-gold rounded-full flex items-center justify-center relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <milestone.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <motion.div
                  className="ml-8 flex-1"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                >
                  <motion.div
                    className="backdrop-blur-sm rounded-lg p-6 shadow-medium"
                    style={{ backgroundColor: "rgba(245, 242, 233, 0.85)" }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-gold font-bold text-xl mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-700">{milestone.description}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            {/* Additional milestone for expansion */}
            <motion.div
              className="relative flex items-start"
              variants={milestoneVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="ml-8 flex-1"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <motion.div
                  className="backdrop-blur-sm rounded-lg p-6 shadow-medium"
                  style={{ backgroundColor: "rgba(245, 242, 233, 0.85)" }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-primary font-bold text-xl mb-2">
                    {t("history.timeline.present")}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("history.timeline.continuous")}
                  </h3>
                  <p className="text-gray-700">
                    {t("history.timeline.expandedDescription")}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
