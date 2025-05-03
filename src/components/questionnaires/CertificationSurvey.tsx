
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const certificationSurveySchema = z.object({
  orgSize: z.enum(["small", "medium", "large"]),
  verificationChallenges: z.array(z.string()).nonempty({ message: "Seleziona almeno un'opzione" }),
  otherVerificationChallenges: z.string().optional(),
  companyAcquisitionChannels: z.array(z.string()).nonempty({ message: "Seleziona almeno un'opzione" }),
  otherCompanyAcquisitionChannels: z.string().optional(),
  platformInfoUtilityRating: z.enum(["1", "2", "3", "4", "5"]),
  platformClientAcquisitionRating: z.enum(["1", "2", "3", "4", "5"]),
  subscriptionWillingness: z.enum(["yes", "no"]),
  betaTesting: z.enum(["yes", "no"]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "È necessario acconsentire al trattamento dei dati" }),
  }),
});

type CertificationSurveyValues = z.infer<typeof certificationSurveySchema>;

interface CertificationSurveyProps {
  onSubmit: (data: CertificationSurveyValues) => void;
  onCancel: () => void;
}

const CertificationSurvey: React.FC<CertificationSurveyProps> = ({ onSubmit, onCancel }) => {
  const { language } = useLanguage();

  const form = useForm<CertificationSurveyValues>({
    resolver: zodResolver(certificationSurveySchema),
    defaultValues: {
      verificationChallenges: [],
      companyAcquisitionChannels: [],
      consent: false,
    },
  });

  const verificationChallengesArray = form.watch("verificationChallenges") || [];
  const companyAcquisitionChannelsArray = form.watch("companyAcquisitionChannels") || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            {language === "it" ? "In che tipologia di organismo lavora?" : "What type of organization do you work for?"}
          </h2>
          
          <FormField
            control={form.control}
            name="orgSize"
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
                        {language === "it" ? "Di piccole dimensioni (<10 M di fatturato)" : "Small size (<10 M turnover)"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="medium" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Di medie dimensioni (10 M < fatturato < 50M)" : "Medium size (10 M < turnover < 50M)"}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="large" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {language === "it" ? "Di grandi dimensioni (>50 M di fatturato)" : "Large size (>50 M turnover)"}
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
              ? "1. Quali sono le principali criticità riscontrate nel processo di verifica di un documento EPD? BARRARE UNA O PIU' RISPOSTE" 
              : "1. What are the main critical issues encountered in the verification process of an EPD document? SELECT ONE OR MORE ANSWERS"}
          </h3>
          
          <FormField
            control={form.control}
            name="verificationChallenges"
            render={() => (
              <FormItem>
                <div className="space-y-2">
                  {[
                    { id: "clientAcquisition", label: language === "it" ? "Difficoltà nell'acquisizione del cliente" : "Difficulty in client acquisition" },
                    { id: "companyComm", label: language === "it" ? "Comunicazione inefficace con l'azienda" : "Ineffective communication with the company" },
                    { id: "consultantComm", label: language === "it" ? "Comunicazione inefficace con il consulente" : "Ineffective communication with the consultant" },
                    { id: "nonCompliance", label: language === "it" ? "Documentazione non conforme ai requisiti normativi" : "Documentation not compliant with regulatory requirements" },
                    { id: "delays", label: language === "it" ? "Ritardi nella consegna dei documenti" : "Delays in document delivery" },
                    { id: "other", label: language === "it" ? "Altro (specificare)" : "Other (specify)" },
                  ].map((item) => (
                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={verificationChallengesArray.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const currentValues = form.getValues("verificationChallenges") || [];
                            const newValues = checked
                              ? [...currentValues, item.id]
                              : currentValues.filter((value) => value !== item.id);
                            form.setValue("verificationChallenges", newValues, { shouldValidate: true });
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

          {verificationChallengesArray.includes("other") && (
            <FormField
              control={form.control}
              name="otherVerificationChallenges"
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
              ? "2. Attraverso quali canali individua le aziende da certificare? BARRARE UNA O PIU' RISPOSTE" 
              : "2. Through which channels do you identify companies to certify? SELECT ONE OR MORE ANSWERS"}
          </h3>
          
          <FormField
            control={form.control}
            name="companyAcquisitionChannels"
            render={() => (
              <FormItem>
                <div className="space-y-2">
                  {[
                    { id: "contactNetwork", label: language === "it" ? "Rete di contatti" : "Contact network" },
                    { id: "phoneSearch", label: language === "it" ? "Ricerca telefonica" : "Phone search" },
                    { id: "linkedin", label: "LinkedIn" },
                    { id: "events", label: language === "it" ? "Eventi tematici (webinar, fiere, ecc.)" : "Thematic events (webinars, fairs, etc.)" },
                    { id: "other", label: language === "it" ? "Altro (specificare)" : "Other (specify)" },
                  ].map((item) => (
                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={companyAcquisitionChannelsArray.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const currentValues = form.getValues("companyAcquisitionChannels") || [];
                            const newValues = checked
                              ? [...currentValues, item.id]
                              : currentValues.filter((value) => value !== item.id);
                            form.setValue("companyAcquisitionChannels", newValues, { shouldValidate: true });
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

          {companyAcquisitionChannelsArray.includes("other") && (
            <FormField
              control={form.control}
              name="otherCompanyAcquisitionChannels"
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
              ? "3. Quanto sarebbe utile una piattaforma che raccolga in un unico spazio tutte le informazioni necessarie per l'inquadramento del progetto secondo gli standard/regolamenti applicabili?" 
              : "3. How useful would a platform be that gathers in one space all the information needed for framing the project according to applicable standards/regulations?"}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {language === "it" 
              ? "Scala da 1 (Per niente importante) a 5 (Molto importante)" 
              : "Scale from 1 (Not important at all) to 5 (Very important)"}
          </p>
          
          <FormField
            control={form.control}
            name="platformInfoUtilityRating"
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
              ? "4. Quanto sarebbe utile una piattaforma che permetta l'acquisizione del cliente con un progetto EPD già strutturato e con scadenze definite?" 
              : "4. How useful would a platform be that allows client acquisition with an already structured EPD project and defined deadlines?"}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {language === "it" 
              ? "Scala da 1 (Per niente importante) a 5 (Molto importante)" 
              : "Scale from 1 (Not important at all) to 5 (Very important)"}
          </p>
          
          <FormField
            control={form.control}
            name="platformClientAcquisitionRating"
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
              ? "5. La piattaforma prevederà un abbonamento per l'acquisizione illimitata di clienti. Sareste disposti a sottoscriverlo per accedere a tutte le sue funzionalità? BARRARE UNA SOLA RISPOSTA" 
              : "5. The platform will include a subscription for unlimited client acquisition. Would you be willing to subscribe to access all its functionalities? SELECT ONLY ONE ANSWER"}
          </h3>
          
          <FormField
            control={form.control}
            name="subscriptionWillingness"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-8"
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

          <h3 className="text-base font-semibold mt-6">
            {language === "it" 
              ? "6. È interessato a partecipare alla fase di beta testing della piattaforma? BARRARE UNA SOLA RISPOSTA" 
              : "6. Are you interested in participating in the beta testing phase of the platform? SELECT ONLY ONE ANSWER"}
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
                    className="flex space-x-8"
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

export default CertificationSurvey;

