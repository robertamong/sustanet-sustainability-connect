
import React from "react";
import { User, Zap, Import, Monitor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      title: 'features.onboarding.title',
      description: 'features.onboarding.description',
      delay: "0ms",
      icon: User,
    },
    {
      title: 'features.ai.title',
      description: 'features.ai.description',
      delay: "100ms",
      icon: Zap,
    },
    {
      title: 'features.import.title',
      description: 'features.import.description',
      delay: "200ms",
      icon: Import,
    },
    {
      title: 'features.monitoring.title',
      description: 'features.monitoring.description',
      delay: "300ms",
      icon: Monitor,
    },
  ];

  return (
    <section id="features" className="section-padding gradient-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sustanet-darkText mb-4">
            Perché scegliere Sustanet
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow animate-delayed animate-fade-in flex flex-col"
                style={{ "--delay": feature.delay } as React.CSSProperties}
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-lg bg-sustanet-secondary mr-3">
                    <IconComponent className="text-sustanet-primary h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-sustanet-darkText">{t(feature.title)}</h3>
                </div>
                <p className="text-gray-600">{t(feature.description)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
