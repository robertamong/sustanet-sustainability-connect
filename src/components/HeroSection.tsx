
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Building } from "lucide-react";
import SignupDialog from "@/components/SignupDialog";
import Logo from "./Logo";

const HeroSection = () => {
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"azienda" | "consulente" | "ente">("azienda");

  const handleSignupClick = (type: "azienda" | "consulente" | "ente") => {
    setUserType(type);
    setSignupDialogOpen(true);
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
            <p className="text-xl md:text-2xl font-medium text-sustanet-darkText mb-8 leading-relaxed">
              Il primo marketplace dedicato alla consulenza di sostenibilità che connette aziende, consulenti ed enti di certificazione, con approccio "zero re-work".
            </p>
            
            <div className="space-y-4 md:flex items-center md:space-y-0 md:space-x-4 mb-8">
              <Button 
                className="w-full md:w-auto bg-sustanet-blue hover:bg-sustanet-blue/80 text-white flex items-center justify-center gap-2 text-base font-medium py-6"
                onClick={() => handleSignupClick("azienda")}
              >
                <Briefcase className="w-5 h-5" />
                Iscriviti come Azienda
              </Button>
              
              <Button 
                className="w-full md:w-auto bg-sustanet-orange hover:bg-sustanet-orange/80 text-white flex items-center justify-center gap-2 text-base font-medium py-6"
                onClick={() => handleSignupClick("consulente")}
              >
                <User className="w-5 h-5" />
                Iscriviti come Consulente
              </Button>
              
              <Button 
                className="w-full md:w-auto bg-sustanet-purple hover:bg-sustanet-purple/80 text-white flex items-center justify-center gap-2 text-base font-medium py-6"
                onClick={() => handleSignupClick("ente")}
              >
                <Building className="w-5 h-5" />
                Iscriviti come Ente di Certificazione
              </Button>
            </div>
            
            <p className="text-lg text-sustanet-darkText/80 italic">
              Una piattaforma, tre esperienze personalizzate.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center animate-slide-in">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full bg-sustanet-primary/10 animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-sustanet-primary/20 rounded-full rotate-45"></div>
              <div className="absolute inset-4 bg-sustanet-secondary/30 rounded-full flex items-center justify-center">
                <Logo size="lg" showText={false} iconClassName="text-sustanet-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Dialog */}
      <SignupDialog 
        open={signupDialogOpen} 
        onOpenChange={setSignupDialogOpen} 
        userType={userType} 
      />
    </section>
  );
};

export default HeroSection;
