
import React from "react";
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

const WaitingListDialog: React.FC<WaitingListDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useLanguage();

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

  const onSubmit = (data: WaitingListFormValues) => {
    console.log("Waiting list registration data:", data);
    // Here would go the API call to register the user to the waiting list
    // For now, we just close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('waitingList.title')}</DialogTitle>
          <DialogDescription>{t('waitingList.description')}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
      </DialogContent>
    </Dialog>
  );
};

export default WaitingListDialog;
