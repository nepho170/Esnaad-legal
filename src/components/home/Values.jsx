import React from "react";
import { useTranslation } from "react-i18next";
import { Shield, Clock, Award, Users } from "lucide-react";

const valueIcons = {
  integrity: Shield,
  service: Clock,
  excellence: Award,
  teamwork: Users,
};

function ValueCard({ valueKey, index }) {
  const { t } = useTranslation();
  const Icon = valueIcons[valueKey];
  const isEven = index % 2 === 0;

  const cardRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!cardRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={cardRef}
      className={`group p-8 rounded-xl transition-all duration-700 hover:scale-105 w-[280px] h-[280px] flex-shrink-0 flex flex-col ${
        isEven
          ? "bg-gray-50 hover:bg-white shadow-medium hover:shadow-large border border-gray-200 hover:border-primary/20"
          : "bg-gradient-to-br from-primary to-primary/90 text-white shadow-medium hover:shadow-large"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div
        className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 flex-shrink-0 ${
          isEven ? "bg-primary/10 group-hover:bg-gold/10" : "bg-white/20"
        } transition-colors duration-300`}
      >
        <Icon
          className={`w-8 h-8 ${
            isEven ? "text-primary group-hover:text-gold" : "text-white"
          } transition-colors duration-300`}
        />
      </div>

      <h3
        className={`text-xl font-semibold mb-4 flex-shrink-0 ${
          isEven ? "text-gray-900" : "text-white"
        }`}
      >
        {t(`values.${valueKey}.title`)}
      </h3>

      <p
        className={`leading-relaxed flex-grow text-sm ${
          isEven ? "text-gray-600" : "text-white/90"
        }`}
      >
        {t(`values.${valueKey}.description`)}
      </p>
    </div>
  );
}

export default function Values() {
  const { t } = useTranslation();
  const valueKeys = ["integrity", "service", "excellence", "teamwork"];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            {t("values.title")}
          </h2>
        </div>

        {/* Mobile: Horizontal scroll only, Desktop: Grid */}
        <div
          className="md:hidden overflow-x-auto pb-4"
          style={{ overflowY: "hidden" }}
        >
          <div className="flex gap-6 px-4 -mx-4">
            {valueKeys.map((valueKey, index) => (
              <ValueCard key={valueKey} valueKey={valueKey} index={index} />
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {valueKeys.map((valueKey, index) => (
            <ValueCard key={valueKey} valueKey={valueKey} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
