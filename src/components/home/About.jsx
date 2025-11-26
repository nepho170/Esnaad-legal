import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, Target } from "lucide-react";

export default function About() {
  const { t } = useTranslation();
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const [visionVisible, setVisionVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);

  useEffect(() => {
    const handleObserver = (ref, setVisible) => {
      if (!ref.current) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref.current);
    };
    handleObserver(visionRef, setVisionVisible);
    handleObserver(missionRef, setMissionVisible);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          <div
            ref={visionRef}
            className={`bg-light rounded-xl p-8 shadow-medium hover:shadow-large transition-all duration-700 ease-out
              ${
                visionVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
          >
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
          <div
            ref={missionRef}
            className={`bg-gradient-to-br from-primary to-primary/90 rounded-xl p-8 shadow-medium hover:shadow-large transition-all duration-700 ease-out text-white
              ${
                missionVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
          >
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
