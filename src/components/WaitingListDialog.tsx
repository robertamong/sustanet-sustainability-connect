
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import InitialSurveyQuestion from "./questionnaires/InitialSurveyQuestion";
import CompanySurvey from "./questionnaires/CompanySurvey";
import ConsultantSurvey from "./questionnaires/ConsultantSurvey";
import CertificationSurvey from "./questionnaires/CertificationSurvey";
import SurveySuccess from "./questionnaires/SurveySuccess";

const waitingListSchema = z.object({
  nome: z.string().min(2, { message: "Il nome deve avere almeno 2 caratteri" }),
  cognome: z.string().min(2, { message: "Il cognome deve avere almeno 2 caratteri" }),
  email: z.string().email({ message: "Email non valida" }),
  organizationType: z.string({
    required_error: "Seleziona il tipo di organizzazione",
  }),
  organizationName: z.string().optional(),
});

type WaitingListFormValues = z.infer<typeof waitingListSchema>;

interface WaitingListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type DialogStep = 
  | 'waitingList' 
  | 'initialSurveyQuestion'
  | 'companySurvey' 
  | 'consultantSurvey' 
  | 'certificationSurvey'
  | 'surveySuccess';

const WaitingListDialog: React.FC<WaitingListDialogProps> = ({ open, onOpenChange }) => {
  const { t, language } = useLanguage();
  const [dialogStep, setDialogStep] = useState<DialogStep>('waitingList');
  const [waitingListData, setWaitingListData] = useState<WaitingListFormValues | null>(null);

  const form = useForm<WaitingListFormValues>({
    resolver: zodResolver(waitingListSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      email: "",
      organizationType: "",
      organizationName: "",
    },
  });

  const handleWaitingListSubmit = (data: WaitingListFormValues) => {
    console.log("Waiting list registration data:", data);
    // Here would go the API call to register the user to the waiting list
    setWaitingListData(data);
    // Move to the Initial Survey Question
    setDialogStep('initialSurveyQuestion');
  };

  const handleInitialQuestionSubmit = (data: { participate: 'yes' | 'no' }) => {
    if (data.participate === 'yes') {
      // If user wants to participate, show the appropriate survey based on organization type
      if (waitingListData?.organizationType === 'azienda') {
        setDialogStep('companySurvey');
      } else if (waitingListData?.organizationType === 'consulente') {
        setDialogStep('consultantSurvey');
      } else if (waitingListData?.organizationType === 'ente') {
        setDialogStep('certificationSurvey');
      } else {
        // If there's an issue with org type, just close the dialog
        onOpenChange(false);
      }
    } else {
      // If user doesn't want to participate, close the dialog
      onOpenChange(false);
    }
  };

  const handleSurveySubmit = (data: any) => {
    console.log("Survey submitted:", data);
    // Here would go the API call to submit the survey data
    setDialogStep('surveySuccess');
  };

  const closeDialog = () => {
    // Reset to initial state when closing
    setDialogStep('waitingList');
    form.reset();
    onOpenChange(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        {dialogStep === 'waitingList' && (
          <>
            <DialogHeader>
              <DialogTitle>{t('waitingList.title')}</DialogTitle>
              <DialogDescription>{t('waitingList.description')}</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleWaitingListSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('waitingList.firstName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('waitingList.firstNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cognome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('waitingList.lastName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('waitingList.lastNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('waitingList.email')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t('waitingList.emailPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('waitingList.organizationType')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('waitingList.selectOrganizationType')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="azienda">{t('waitingList.company')}</SelectItem>
                          <SelectItem value="consulente">{t('waitingList.consultant')}</SelectItem>
                          <SelectItem value="ente">{t('waitingList.certificationBody')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('waitingList.organizationName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('waitingList.organizationNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    {t('waitingList.cancel')}
                  </Button>
                  <Button type="submit" className="bg-sustanet-primary hover:bg-sustanet-primary/80 text-white">
                    {t('waitingList.submit')}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}

        {dialogStep === 'initialSurveyQuestion' && (
          <InitialSurveyQuestion 
            onSubmit={handleInitialQuestionSubmit}
            onCancel={closeDialog}
          />
        )}

        {dialogStep === 'companySurvey' && (
          <CompanySurvey 
            onSubmit={handleSurveySubmit}
            onCancel={closeDialog}
          />
        )}

        {dialogStep === 'consultantSurvey' && (
          <ConsultantSurvey 
            onSubmit={handleSurveySubmit}
            onCancel={closeDialog}
          />
        )}

        {dialogStep === 'certificationSurvey' && (
          <CertificationSurvey 
            onSubmit={handleSurveySubmit}
            onCancel={closeDialog}
          />
        )}

        {dialogStep === 'surveySuccess' && (
          <SurveySuccess onClose={closeDialog} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitingListDialog;
