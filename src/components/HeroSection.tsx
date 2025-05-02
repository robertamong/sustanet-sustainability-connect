
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Building, CalendarIcon } from "lucide-react";
import SignupDialog from "@/components/SignupDialog";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"azienda" | "consulente" | "ente">("azienda");
  const [date, setDate] = useState<Date>();
  const { t } = useLanguage();

  const handleSignupClick = (type: "azienda" | "consulente" | "ente") => {
    setUserType(type);
    setSignupDialogOpen(true);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      // Here you could trigger an API call to book the appointment
      console.log(`Appointment booked for ${format(selectedDate, "PPP")}`);
    }
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
              {t('hero.introText')}
            </p>
            
            <div className="space-y-4 md:flex items-center md:space-y-0 md:space-x-4 mb-8">
              <Button 
                className="w-full md:w-auto bg-sustanet-blue hover:bg-sustanet-blue/80 text-white flex items-center justify-center gap-2 text-base font-medium py-6"
                onClick={() => handleSignupClick("azienda")}
              >
                <Briefcase className="w-5 h-5" />
                {t('hero.signupCompany')}
              </Button>
              
              <Button 
                className="w-full md:w-auto bg-sustanet-orange hover:bg-sustanet-orange/80 text-white flex items-center justify-center gap-2 text-base font-medium py-6"
                onClick={() => handleSignupClick("consulente")}
              >
                <User className="w-5 h-5" />
                {t('hero.signupConsultant')}
              </Button>
              
              <Button 
                className="w-full md:w-auto bg-sustanet-purple hover:bg-sustanet-purple/80 text-white flex items-center justify-center gap-2 text-base font-medium py-6"
                onClick={() => handleSignupClick("ente")}
              >
                <Building className="w-5 h-5" />
                {t('hero.signupCertification')}
              </Button>
            </div>
            
            <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-xl mx-auto border border-gray-100 animate-delayed animate-fade-in mt-8" style={{ "--delay": "300ms" } as React.CSSProperties}>
              <h3 className="text-xl font-bold mb-3 text-sustanet-darkText">{t('cta.appointment.title')}</h3>
              <p className="text-gray-600 mb-5">{t('cta.appointment.description')}</p>
              
              <div className="flex justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="text-sustanet-primary border-sustanet-primary hover:bg-sustanet-primary hover:text-white transition-colors duration-300 flex items-center gap-2 mx-auto"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, "PPP") : t('cta.book')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                      disabled={(date) => 
                        date < new Date() || // Past dates
                        date.getDay() === 0 || // Sundays
                        date.getDay() === 6    // Saturdays
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <p className="text-lg text-sustanet-darkText/80 italic mt-4 text-center">
              {t('hero.platformDescription')}
            </p>
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
