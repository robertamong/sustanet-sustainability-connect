
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const CtaSection = () => {
  const [date, setDate] = useState<Date>();
  const { t } = useLanguage();

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
            {t('cta.title')}
          </h2>
        </div>

        <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-md mx-auto border border-gray-100 animate-delayed animate-fade-in" style={{ "--delay": "300ms" } as React.CSSProperties}>
          <h3 className="text-xl font-bold mb-5 text-sustanet-darkText">{t('cta.appointment.title')}</h3>
          
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
      </div>
    </section>
  );
};

export default CtaSection;
