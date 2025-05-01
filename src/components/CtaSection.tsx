
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Building } from "lucide-react";
import SignupDialog from "@/components/SignupDialog";

const CtaSection = () => {
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"azienda" | "consulente" | "ente">("azienda");

  const handleSignupClick = (type: "azienda" | "consulente" | "ente") => {
    setUserType(type);
    setSignupDialogOpen(true);
  };
  
  return (
    <section className="section-padding bg-sustanet-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-sustanet-darkText mb-4">
            🔄 Inizia subito. La sostenibilità non può aspettare.
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Unisciti alla piattaforma che sta rivoluzionando il modo in cui aziende, consulenti ed enti di certificazione collaborano per un futuro sostenibile.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12 animate-slide-in">
          <Button 
            className="w-full md:w-auto bg-sustanet-blue hover:bg-sustanet-blue/90 text-white flex items-center justify-center gap-2 text-lg font-medium py-6 px-8 shadow-md"
            onClick={() => handleSignupClick("azienda")}
          >
            <Briefcase className="w-5 h-5" />
            Iscriviti come Azienda
          </Button>
          
          <Button 
            className="w-full md:w-auto bg-sustanet-orange hover:bg-sustanet-orange/90 text-white flex items-center justify-center gap-2 text-lg font-medium py-6 px-8 shadow-md"
            onClick={() => handleSignupClick("consulente")}
          >
            <User className="w-5 h-5" />
            Iscriviti come Consulente
          </Button>
          
          <Button 
            className="w-full md:w-auto bg-sustanet-purple hover:bg-sustanet-purple/90 text-white flex items-center justify-center gap-2 text-lg font-medium py-6 px-8 shadow-md"
            onClick={() => handleSignupClick("ente")}
          >
            <Building className="w-5 h-5" />
            Iscriviti come Ente di Certificazione
          </Button>
        </div>

        <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-xl mx-auto border border-gray-100 animate-delayed animate-fade-in" style={{ "--delay": "300ms" } as React.CSSProperties}>
          <div className="text-2xl mb-3">📆</div>
          <h3 className="text-xl font-bold mb-3 text-sustanet-darkText">Primo appuntamento gratuito</h3>
          <p className="text-gray-600 mb-5">30 minuti gratuiti per tutte le aziende che si iscrivono</p>
          <Button 
            variant="outline" 
            className="text-sustanet-primary border-sustanet-primary hover:bg-sustanet-primary hover:text-white transition-colors duration-300"
          >
            Prenota ora
          </Button>
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

export default CtaSection;
