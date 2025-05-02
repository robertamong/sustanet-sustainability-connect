
import React from "react";
import { FileText, ListChecks, MessageSquare, SquareStack } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WorkflowSection = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: <ListChecks className="w-10 h-10 text-sustanet-primary" />,
      title: t('workflow.step1.title'),
      description: t('workflow.step1.description'),
      delay: "0ms",
    },
    {
      icon: <FileText className="w-10 h-10 text-sustanet-primary" />,
      title: t('workflow.step2.title'),
      description: t('workflow.step2.description'),
      delay: "200ms",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-sustanet-primary" />,
      title: t('workflow.step3.title'),
      description: t('workflow.step3.description'),
      delay: "400ms",
    },
    {
      icon: <SquareStack className="w-10 h-10 text-sustanet-primary" />,
      title: t('workflow.step4.title'),
      description: t('workflow.step4.description'),
      delay: "600ms",
    },
  ];

  return (
    <section id="workflow" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sustanet-darkText mb-4">
            {t('workflow.title')}
          </h2>
          <p className="text-lg text-gray-600">{t('workflow.subtitle')}</p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-12 bottom-0 w-1 bg-sustanet-secondary -translate-x-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex ${index % 2 === 0 ? 'md:justify-end md:text-right' : 'md:justify-start'} animate-delayed animate-fade-in`}
                style={{ "--delay": step.delay } as React.CSSProperties}
              >
                <div className={`bg-white border border-sustanet-secondary rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow max-w-md flex ${index % 2 === 0 ? 'md:flex-row-reverse' : 'flex-row'} gap-4 items-center`}>
                  <div className="bg-white border-4 border-sustanet-secondary rounded-full p-4">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sustanet-darkText mb-2 flex items-center gap-2">
                      <span className="flex justify-center items-center w-8 h-8 rounded-full bg-sustanet-primary text-white font-bold text-sm">
                        {index + 1}
                      </span>
                      {step.title}
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
