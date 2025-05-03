
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";

const companySurveySchema = z.object({
  companySize: z.enum(["small", "medium", "large"]),
  country: z.string().min(1, { message: "Il paese è obbligatorio" }),
  city: z.string().min(1, { message: "La città è obbligatoria" }),
  role: z.enum(["management", "technical", "commercial"]),
  sustainabilityImportance: z.enum(["1", "2", "3", "4", "5"]),
  certificationImportance: z.enum(["1", "2", "3", "4", "5"]),
  epdChallenges: z.array(z.string()).nonempty({ message: "Seleziona almeno un'opzione" }),
  otherEpdChallenges: z.string().optional(),
  consultantChannels: z.array(z.string()).nonempty({ message: "Seleziona almeno un'opzione" }),
  otherConsultantChannels: z.string().optional(),
  contactEaseRating: z.enum(["1", "2", "3", "4", "5"]),
  updateFrequency: z.enum(["multipleWeekly", "weekly", "biweekly", "monthly", "quarterly", "other"]),
  otherUpdateFrequency: z.string().optional(),
  onboardingInterestRating: z.enum(["1", "2", "3", "4", "5"]),
  matchingInterestRating: z.enum(["1", "2", "3", "4", "5"]),
  usefulAspects: z.string().optional(),
  suggestions: z.string().optional(),
  betaTesting: z.enum(["yes", "no"]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "È necessario acconsentire al trattamento dei dati" }),
  }),
});

type CompanySurveyValues = z.infer<typeof companySurveySchema>;

interface CompanySurveyProps {
  onSubmit: (data: CompanySurveyValues) => void;
  onCancel: () => void;
}

const CompanySurvey: React.FC<CompanySurveyProps> = ({ onSubmit, onCancel }) => {
  const { language } = useLanguage();

  const form = useForm<CompanySurveyValues>({
    resolver: zodResolver(companySurveySchema),
    defaultValues: {
      epdChallenges: [],
      consultantChannels: [],
      consent: false,
    },
  });

  const epdChallengesArray = form.watch("epdChallenges") || [];
  const consultantChannelsArray = form.watch("consultantChannels") || [];
  const updateFrequency = form.watch("updateFrequency");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            {language === "it" ? "In che tipologia di azienda lavora?" : "What type of company do you work in?"}
          </h2>
          
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="small" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Piccola (<50 dipendenti)" : "Small (<50 employees)"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="medium" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Media (50 < dipendenti < 250)" : "Medium (50 < employees < 250)"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="large" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Grande (>250 dipendenti)" : "Large (>250 employees)"}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === "it" ? "Stato (indicare lo stato dove è presente l'azienda)" : "Country (indicate where the company is located)"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === "it" ? "Città (indicare la città dove è presente l'azienda)" : "City (indicate where the company is located)"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "1. Qual è il suo ruolo all'interno dell'organizzazione? BARRARE UNA SOLA RISPOSTA" 
              : "1. What is your role within the organization? SELECT ONLY ONE ANSWER"}
          </h3>
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="management" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Direzione" : "Management"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="technical" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Area tecnica" : "Technical Area"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="commercial" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Area commerciale" : "Commercial Area"}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "2. Quanto considera rilevante il tema della sostenibilità per la sua azienda?" 
              : "2. How relevant do you consider the topic of sustainability for your company?"}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {language === "it" 
              ? "Scala da 1 (Per niente importante) a 5 (Molto importante)" 
              : "Scale from 1 (Not important at all) to 5 (Very important)"}
          </p>
          
          <FormField
            control={form.control}
            name="sustainabilityImportance"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-3"
                  >
                    {["1", "2", "3", "4", "5"].map((value) => (
                      <FormItem key={value} className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "3. Quanto ritiene siano importanti le certificazioni di sostenibilità per la Sua azienda?" 
              : "3. How important do you consider sustainability certifications for your company?"}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {language === "it" 
              ? "Scala da 1 (Per niente rilevanti) a 5 (Molto rilevanti)" 
              : "Scale from 1 (Not relevant at all) to 5 (Very relevant)"}
          </p>
          
          <FormField
            control={form.control}
            name="certificationImportance"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-3"
                  >
                    {["1", "2", "3", "4", "5"].map((value) => (
                      <FormItem key={value} className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "4. Quali criticità ha riscontrato nella predisposizione o redazione di una EPD (Environmental Product Declaration)? BARRARE UNA O PIU' RISPOSTE" 
              : "4. What critical issues have you encountered in the preparation or drafting of an EPD (Environmental Product Declaration)? SELECT ONE OR MORE ANSWERS"}
          </h3>
          
          <FormField
            control={form.control}
            name="epdChallenges"
            render={() => (
              <FormItem>
                <div className="space-y-2">
                  {[
                    { id: "complexity", label: language === "it" ? "Complessità dell'argomento" : "Complexity of the topic" },
                    { id: "findConsultant", label: language === "it" ? "Difficoltà nel reperimento di un consulente qualificato" : "Difficulty in finding a qualified consultant" },
                    { id: "projectManagement", label: language === "it" ? "Monitoraggio e gestione del progetto" : "Project monitoring and management" },
                    { id: "dataCollection", label: language === "it" ? "Raccolta strutturata dei dati" : "Structured data collection" },
                    { id: "certificationProcess", label: language === "it" ? "Iter del processo di certificazione" : "Certification process workflow" },
                    { id: "other", label: language === "it" ? "Altro (specificare)" : "Other (specify)" },
                  ].map((item) => (
                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={epdChallengesArray.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const currentValues = form.getValues("epdChallenges") || [];
                            const newValues = checked
                              ? [...currentValues, item.id]
                              : currentValues.filter((value) => value !== item.id);
                            form.setValue("epdChallenges", newValues, { shouldValidate: true });
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item.label}</FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {epdChallengesArray.includes("other") && (
            <FormField
              control={form.control}
              name="otherEpdChallenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === "it" ? "Specificare altro" : "Specify other"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "5. Attraverso quali canali individuate i consulenti/società di consulenza in ambito sostenibilità? BARRARE UNA O PIU' RISPOSTE" 
              : "5. Through which channels do you identify consultants/consulting companies in the sustainability field? SELECT ONE OR MORE ANSWERS"}
          </h3>
          
          <FormField
            control={form.control}
            name="consultantChannels"
            render={() => (
              <FormItem>
                <div className="space-y-2">
                  {[
                    { id: "personalNetwork", label: language === "it" ? "Rete di contatti personali" : "Personal contact network" },
                    { id: "onlineSearch", label: language === "it" ? "Ricerca online (es. Google)" : "Online search (e.g. Google)" },
                    { id: "linkedin", label: "LinkedIn" },
                    { id: "events", label: language === "it" ? "Eventi tematici (webinar, fiere, ecc.)" : "Thematic events (webinars, fairs, etc.)" },
                    { id: "other", label: language === "it" ? "Altro (specificare)" : "Other (specify)" },
                  ].map((item) => (
                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={consultantChannelsArray.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const currentValues = form.getValues("consultantChannels") || [];
                            const newValues = checked
                              ? [...currentValues, item.id]
                              : currentValues.filter((value) => value !== item.id);
                            form.setValue("consultantChannels", newValues, { shouldValidate: true });
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item.label}</FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {consultantChannelsArray.includes("other") && (
            <FormField
              control={form.control}
              name="otherConsultantChannels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === "it" ? "Specificare altro" : "Specify other"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "6. Quanto è semplice, secondo la sua esperienza, entrare in contatto con consulenti o società di consulenza?" 
              : "6. How easy is it, based on your experience, to get in touch with consultants or consulting companies?"}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {language === "it" 
              ? "Scala da 1 (Per niente semplice) a 5 (Molto semplice)" 
              : "Scale from 1 (Not easy at all) to 5 (Very easy)"}
          </p>
          
          <FormField
            control={form.control}
            name="contactEaseRating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-3"
                  >
                    {["1", "2", "3", "4", "5"].map((value) => (
                      <FormItem key={value} className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "7. Con quale frequenza ricevete aggiornamenti sullo stato di avanzamento dei documenti tecnici richiesti e del processo di certificazione? BARRARE UNA SOLA RISPOSTA" 
              : "7. How frequently do you receive updates on the progress of the requested technical documents and certification process? SELECT ONLY ONE ANSWER"}
          </h3>
          
          <FormField
            control={form.control}
            name="updateFrequency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="multipleWeekly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Più volte a settimana" : "Multiple times a week"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="weekly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Ogni settimana" : "Every week"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="biweekly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Ogni 15 giorni" : "Every two weeks"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="monthly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Una volta al mese" : "Once a month"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="quarterly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Più volte a trimestre" : "Multiple times per quarter"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Altro (specificare)" : "Other (specify)"}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {updateFrequency === "other" && (
            <FormField
              control={form.control}
              name="otherUpdateFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === "it" ? "Specificare altro" : "Specify other"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "8. Quanto ritiene interessante la funzione di onboarding personalizzato per il servizio EPD integrato nella piattaforma Sustanet?" 
              : "8. How interesting do you find the personalized onboarding function for the EPD service integrated into the Sustanet platform?"}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {language === "it" 
              ? "Scala da 1 (Per niente interessante) a 5 (Molto interessante)" 
              : "Scale from 1 (Not interesting at all) to 5 (Very interesting)"}
          </p>
          
          <FormField
            control={form.control}
            name="onboardingInterestRating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-3"
                  >
                    {["1", "2", "3", "4", "5"].map((value) => (
                      <FormItem key={value} className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "9. Quanto ritiene interessante la funzionalità di matching automatico con il miglior consulente dotato di competenze specifiche per il settore in cui opera la sua azienda?" 
              : "9. How interesting do you find the automatic matching functionality with the best consultant with specific skills for the sector in which your company operates?"}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {language === "it" 
              ? "Scala da 1 (Per niente interessante) a 5 (Molto interessante)" 
              : "Scale from 1 (Not interesting at all) to 5 (Very interesting)"}
          </p>
          
          <FormField
            control={form.control}
            name="matchingInterestRating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-3"
                  >
                    {["1", "2", "3", "4", "5"].map((value) => (
                      <FormItem key={value} className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "10. Quali aspetti trova particolarmente utili rispetto alle soluzioni attualmente disponibili sul mercato? (facoltativa)" 
              : "10. What aspects do you find particularly useful compared to solutions currently available on the market? (optional)"}
          </h3>
          
          <FormField
            control={form.control}
            name="usefulAspects"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "11. Ha suggerimenti da proporre per il miglioramento della piattaforma? (facoltativa)" 
              : "11. Do you have suggestions for improving the platform? (optional)"}
          </h3>
          
          <FormField
            control={form.control}
            name="suggestions"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "12. È interessato/a a partecipare alla fase di beta testing della piattaforma? BARRARE UNA SOLA RISPOSTA" 
              : "12. Are you interested in participating in the beta testing phase of the platform? SELECT ONLY ONE ANSWER"}
          </h3>
          
          <FormField
            control={form.control}
            name="betaTesting"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "SI" : "YES"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "NO" : "NO"}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {language === "it" 
                      ? "Acconsento al trattamento dei dati forniti ai fini dello sviluppo della piattaforma Sustanet." 
                      : "I consent to the processing of the data provided for the development of the Sustanet platform."}
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            {language === "it" ? "Annulla" : "Cancel"}
          </Button>
          <Button type="submit" className="bg-sustanet-primary hover:bg-sustanet-primary/80">
            {language === "it" ? "Invia" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CompanySurvey;

