
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Building, Calendar as CalendarIcon } from "lucide-react";
import SignupDialog from "@/components/SignupDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CtaSection = () => {
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"azienda" | "consulente" | "ente">("azienda");
  const [date, setDate] = useState<Date>();

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
    <section className="section-padding bg-sustanet-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-sustanet-darkText mb-4">
            Inizia subito. La sostenibilità non può aspettare.
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
          <h3 className="text-xl font-bold mb-3 text-sustanet-darkText">Primo appuntamento gratuito</h3>
          <p className="text-gray-600 mb-5">30 minuti gratuiti per tutte le aziende che si iscrivono</p>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="text-sustanet-primary border-sustanet-primary hover:bg-sustanet-primary hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP") : "Prenota ora"}
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
