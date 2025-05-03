
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SurveySuccessProps {
  onClose: () => void;
}

const SurveySuccess: React.FC<SurveySuccessProps> = ({ onClose }) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="bg-green-100 p-3 rounded-full mb-4">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">
        {language === "it" ? "Grazie per la tua partecipazione!" : "Thank you for your participation!"}
      </h2>
      <p className="text-gray-600 text-center mb-6">
        {language === "it" 
          ? "Le tue risposte ci aiuteranno a migliorare Sustanet." 
          : "Your answers will help us improve Sustanet."}
      </p>
      <Button onClick={onClose} className="bg-sustanet-primary hover:bg-sustanet-primary/90">
        {language === "it" ? "Chiudi" : "Close"}
      </Button>
    </div>
  );
};

export default SurveySuccess;
