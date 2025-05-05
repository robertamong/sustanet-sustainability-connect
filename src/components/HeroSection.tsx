
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import WaitingListDialog from "./WaitingListDialog";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const [waitingListDialogOpen, setWaitingListDialogOpen] = useState(false);
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const handleWaitingListClick = () => {
    setWaitingListDialogOpen(true);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center gradient-bg section-padding pt-24">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-sustanet-secondary/40 -top-20 -left-20 blur-3xl" />
        <div className="absolute w-96 h-96 rounded-full bg-sustanet-secondary/30 bottom-0 right-0 blur-3xl" />
      </div>
      
      <div className="container mx-auto z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 animate-fade-in">
            <div className="mb-6">
              <Logo size="lg" className="inline-block" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className={isMobile ? "order-2" : "order-1"}>
                <p className="text-xl md:text-2xl font-medium text-sustanet-darkText mb-8 leading-relaxed">
                  {language === "it" 
                    ? "La prima piattaforma integrata per la gestione strutturata dell'intero processo di redazione dell'EPD che connette aziende, consulenti ed enti di certificazione, con approccio \"zero re-work\""
                    : "The first integrated platform for structured management of the entire EPD writing process that connects companies, consultants and certification bodies, with \"zero re-work\" approach"}
                </p>
              </div>
              <div className={`${isMobile ? "order-1" : "order-2"} flex-shrink-0`}>
                <img 
                  src="/lovable-uploads/4ec53213-3df9-4794-88f6-5bc23e7b612d.png" 
                  alt="Sustanet Platform" 
                  className="max-w-full h-auto rounded-lg shadow-md" 
                  style={{ maxWidth: isMobile ? "100%" : "300px" }}
                />
              </div>
            </div>
            
            <div className="mb-8">
              <Button 
                className="w-full md:w-auto bg-sustanet-primary hover:bg-sustanet-primary/80 text-white flex items-center justify-center gap-2 text-base font-medium py-6"
                onClick={handleWaitingListClick}
              >
                {t('hero.waitingListCta')}
              </Button>
            </div>
            
            <p className="text-lg text-sustanet-darkText/80 italic mt-4 text-center">
              {t('hero.platformDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Waiting List Dialog */}
      <WaitingListDialog 
        open={waitingListDialogOpen} 
        onOpenChange={setWaitingListDialogOpen} 
      />
    </section>
  );
};

export default HeroSection;
