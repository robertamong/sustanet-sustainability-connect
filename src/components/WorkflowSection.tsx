
import React from "react";
import { FileText, UserCheck, FolderOpen, ChartLine } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WorkflowSection = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: <UserCheck className="w-10 h-10 text-sustanet-primary" />,
      title: t('workflow.step1.title'),
      description: t('workflow.step1.description'),
      delay: "0ms",
      image: "/workflow-registration.jpg"
    },
    {
      icon: <FileText className="w-10 h-10 text-sustanet-primary" />,
      title: t('workflow.step2.title'),
      description: t('workflow.step2.description'),
      delay: "200ms",
      image: "/workflow-onboarding.jpg"
    },
    {
      icon: <FolderOpen className="w-10 h-10 text-sustanet-primary" />,
      title: t('workflow.step3.title'),
      description: t('workflow.step3.description'),
      delay: "400ms",
      image: "/workflow-project.jpg"
    },
    {
      icon: <ChartLine className="w-10 h-10 text-sustanet-primary" />,
      title: t('workflow.step4.title'),
      description: t('workflow.step4.description'),
      delay: "600ms",
      image: "/workflow-monitoring.jpg"
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

        <div className="grid grid-cols-1 gap-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 animate-delayed animate-fade-in`}
              style={{ "--delay": step.delay } as React.CSSProperties}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={step.image} 
                  alt={t(`workflow.step${index + 1}.title`)} 
                  className="w-full h-64 object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 p-6">
                <div className="flex items-center mb-4 gap-4">
                  <div className="bg-white border-4 border-sustanet-secondary rounded-full p-3">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-sustanet-darkText flex items-center gap-2">
                    <span className="flex justify-center items-center w-8 h-8 rounded-full bg-sustanet-primary text-white font-bold text-sm">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:flex justify-center mt-6">
                    <div className={`w-12 h-12 flex items-center justify-center ${index % 2 !== 0 ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sustanet-primary">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
