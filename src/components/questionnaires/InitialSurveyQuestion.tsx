
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";

const initialQuestionSchema = z.object({
  participate: z.enum(["yes", "no"])
});

type InitialQuestionValues = z.infer<typeof initialQuestionSchema>;

interface InitialSurveyQuestionProps {
  onSubmit: (data: InitialQuestionValues) => void;
  onCancel: () => void;
}

const InitialSurveyQuestion: React.FC<InitialSurveyQuestionProps> = ({ onSubmit, onCancel }) => {
  const { language } = useLanguage();

  const form = useForm<InitialQuestionValues>({
    resolver: zodResolver(initialQuestionSchema),
    defaultValues: {
      participate: undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">
            {language === "it" 
              ? "Possiamo rubarle 5 minuti per raccogliere qualche informazione utile per migliorare Sustanet?" 
              : "Can we steal 5 minutes of your time to collect some useful information to improve Sustanet?"}
          </h2>
        </div>
        
        <FormField
          control={form.control}
          name="participate"
          render={({ field }) => (
            <FormItem className="space-y-3 flex justify-center">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-12"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-medium text-lg">
                      {language === "it" ? "SI" : "YES"}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-medium text-lg">
                      {language === "it" ? "NO" : "NO"}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center space-x-4 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            {language === "it" ? "Annulla" : "Cancel"}
          </Button>
          <Button type="submit" className="bg-sustanet-primary hover:bg-sustanet-primary/80">
            {language === "it" ? "Conferma" : "Confirm"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InitialSurveyQuestion;

