
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
import { Briefcase, User, Building } from "lucide-react";

// Schema di validazione per il form di registrazione
const signupSchema = z.object({
  nome: z.string().min(2, { message: "Il nome deve avere almeno 2 caratteri" }),
  cognome: z.string().min(2, { message: "Il cognome deve avere almeno 2 caratteri" }),
  email: z.string().email({ message: "Email non valida" }),
  password: z.string().min(6, { message: "La password deve avere almeno 6 caratteri" }),
  organizzazione: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

type UserType = "azienda" | "consulente" | "ente";

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: UserType;
}

const userTypeConfig = {
  azienda: {
    title: "Registrazione Azienda",
    description: "Inserisci i tuoi dati per iscriverti come azienda",
    icon: <Briefcase className="w-6 h-6 text-sustanet-blue" />,
    color: "bg-sustanet-blue hover:bg-sustanet-blue/80",
  },
  consulente: {
    title: "Registrazione Consulente",
    description: "Inserisci i tuoi dati per iscriverti come consulente",
    icon: <User className="w-6 h-6 text-sustanet-orange" />,
    color: "bg-sustanet-orange hover:bg-sustanet-orange/80",
  },
  ente: {
    title: "Registrazione Ente di Certificazione",
    description: "Inserisci i tuoi dati per iscriverti come ente di certificazione",
    icon: <Building className="w-6 h-6 text-sustanet-purple" />,
    color: "bg-sustanet-purple hover:bg-sustanet-purple/80",
  },
};

const SignupDialog: React.FC<SignupDialogProps> = ({ open, onOpenChange, userType }) => {
  const config = userTypeConfig[userType];

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      email: "",
      password: "",
      organizzazione: "",
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log(`Registrazione ${userType} con dati:`, data);
    // Qui in futuro andrà implementata la vera registrazione
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {config.icon}
            <DialogTitle>{config.title}</DialogTitle>
          </div>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome*</FormLabel>
                    <FormControl>
                      <Input placeholder="Inserisci il tuo nome" {...field} />
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
                    <FormLabel>Cognome*</FormLabel>
                    <FormControl>
                      <Input placeholder="Inserisci il tuo cognome" {...field} />
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
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="esempio@dominio.it" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Crea una password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizzazione"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {userType === "azienda"
                      ? "Nome azienda"
                      : userType === "consulente"
                      ? "Studio/Organizzazione"
                      : "Nome ente"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        userType === "azienda"
                          ? "Inserisci il nome dell'azienda"
                          : userType === "consulente"
                          ? "Inserisci il nome dello studio/organizzazione"
                          : "Inserisci il nome dell'ente"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annulla
              </Button>
              <Button type="submit" className={config.color}>
                Registrati
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
