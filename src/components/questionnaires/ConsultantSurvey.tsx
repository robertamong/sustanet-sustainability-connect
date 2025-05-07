import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";

// Update schema to use min(1) instead of nonempty()
const consultantSurveySchema = z.object({
	workStatus: z.enum(["freelance", "smallCompany", "mediumCompany", "largeCompany"]),
	country: z.string().min(1, { message: "Il paese è obbligatorio" }),
	city: z.string().min(1, { message: "La città è obbligatoria" }),
	epdDifficulties: z.array(z.string()).min(1, { message: "Seleziona almeno un'opzione" }),
	otherEpdDifficulties: z.string().optional(),
	clientAcquisitionChannels: z.array(z.string()).min(1, { message: "Seleziona almeno un'opzione" }),
	otherClientAcquisitionChannels: z.string().optional(),
	platformInfoUtilityRating: z.enum(["1", "2", "3", "4", "5"]),
	platformClientAcquisitionRating: z.enum(["1", "2", "3", "4", "5"]),
	platformDataCollectionRating: z.enum(["1", "2", "3", "4", "5"]),
	platformProjectManagementRating: z.enum(["1", "2", "3", "4", "5"]),
	timeSpentOnAcquisition: z.enum(["5-15", "15-25", "25-35", "more35"]),
	subscriptionWillingness: z.enum(["yes", "no"]),
	betaTesting: z.enum(["yes", "no"]),
	consent: z.literal(true, {
		errorMap: () => ({ message: "È necessario acconsentire al trattamento dei dati" })
	})
});

type ConsultantSurveyValues = z.infer<typeof consultantSurveySchema>;

interface ConsultantSurveyProps {
	onSubmit: (data: ConsultantSurveyValues) => void;
	onCancel: () => void;
}

const ConsultantSurvey: React.FC<ConsultantSurveyProps> = ({ onSubmit, onCancel }) => {
	const { language } = useLanguage();

	const form = useForm<ConsultantSurveyValues>({
		resolver: zodResolver(consultantSurveySchema),
		defaultValues: {
			epdDifficulties: [],
			clientAcquisitionChannels: [],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			consent: false as any // Using 'any' to bypass the type check, will be validated by Zod
		}
	});

	const epdDifficultiesArray = form.watch("epdDifficulties");
	const clientAcquisitionChannelsArray = form.watch("clientAcquisitionChannels");

	return (
		<div className="max-h-[80vh] overflow-y-auto px-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<h2 className="text-xl font-bold">{language === "it" ? "Qual è il suo inquadramento lavorativo?" : "What is your work status?"}</h2>

						<FormField
							control={form.control}
							name="workStatus"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="freelance" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "Partita IVA" : "Freelancer"}</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="smallCompany" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "Dipendente di una piccola società di consulenza (<10 M di fatturato)" : "Employee of a small consulting company (<10 M turnover)"}</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="mediumCompany" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "Dipendente di una società di consulenza media (10 M < fatturato < 50M)" : "Employee of a medium consulting company (10 M < turnover < 50M)"}</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="largeCompany" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "Dipendente di una grande società di consulenza (>50 M di fatturato)" : "Employee of a large consulting company (>50 M turnover)"}</FormLabel>
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
										<FormLabel>{language === "it" ? "Stato (indicare lo stato di localizzazione)" : "Country (indicate the location)"}</FormLabel>
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
										<FormLabel>{language === "it" ? "Città (indicare la città di localizzazione)" : "City (indicate the location)"}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "1. Quali sono le principali difficoltà riscontrate nella redazione di una EPD (Environmental Product Declaration)? BARRARE UNA O PIU' RISPOSTE" : "1. What are the main difficulties encountered in drafting an EPD (Environmental Product Declaration)? SELECT ONE OR MORE ANSWERS"}</h3>

						<FormField
							control={form.control}
							name="epdDifficulties"
							render={() => (
								<FormItem>
									<div className="space-y-2">
										{[
											{ id: "clientAcquisition", label: language === "it" ? "Acquisizione di nuovi clienti" : "Acquisition of new clients" },
											{ id: "clientCommunication", label: language === "it" ? "Complessità comunicativa con l'azienda cliente" : "Communication complexity with the client company" },
											{ id: "dataStructure", label: language === "it" ? "Strutturazione della raccolta dati" : "Structuring data collection" },
											{ id: "timeManagement", label: language === "it" ? "Gestione delle tempistiche con clienti multipli" : "Managing timelines with multiple clients" },
											{ id: "other", label: language === "it" ? "Altro (specificare)" : "Other (specify)" }
										].map(item => (
											<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={epdDifficultiesArray?.includes(item.id)}
														onCheckedChange={checked => {
															const currentValues = [...(form.getValues("epdDifficulties") || [])];
															const newValues = checked ? [...currentValues, item.id] : currentValues.filter(value => value !== item.id);
															form.setValue("epdDifficulties", newValues, { shouldValidate: true });
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

						{epdDifficultiesArray?.includes("other") && (
							<FormField
								control={form.control}
								name="otherEpdDifficulties"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{language === "it" ? "Specificare altro" : "Specify other"}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "2. Quali canali utilizza per individuare aziende interessate ai suoi servizi di consulenza? BARRARE UNA O PIU' RISPOSTE" : "2. Which channels do you use to identify companies interested in your consulting services? SELECT ONE OR MORE ANSWERS"}</h3>

						<FormField
							control={form.control}
							name="clientAcquisitionChannels"
							render={() => (
								<FormItem>
									<div className="space-y-2">
										{[
											{ id: "contactNetwork", label: language === "it" ? "Rete di contatti" : "Contact network" },
											{ id: "phoneSearch", label: language === "it" ? "Ricerca telefonica" : "Phone search" },
											{ id: "linkedin", label: "LinkedIn" },
											{ id: "events", label: language === "it" ? "Eventi tematici (webinar, fiere, ecc.)" : "Thematic events (webinars, fairs, etc.)" },
											{ id: "other", label: language === "it" ? "Altro (specificare)" : "Other (specify)" }
										].map(item => (
											<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={clientAcquisitionChannelsArray?.includes(item.id)}
														onCheckedChange={checked => {
															const currentValues = [...(form.getValues("clientAcquisitionChannels") || [])];
															const newValues = checked ? [...currentValues, item.id] : currentValues.filter(value => value !== item.id);
															form.setValue("clientAcquisitionChannels", newValues, { shouldValidate: true });
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

						{clientAcquisitionChannelsArray?.includes("other") && (
							<FormField
								control={form.control}
								name="otherClientAcquisitionChannels"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{language === "it" ? "Specificare altro" : "Specify other"}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "3. Quanto ritiene utile una piattaforma che fornisca tutte le informazioni necessarie per l'inquadramento del progetto EPD in base agli standard e regolamenti?" : "3. How useful do you consider a platform that provides all the necessary information for framing the EPD project according to standards and regulations?"}</h3>
						<p className="text-sm text-gray-500 mb-2">{language === "it" ? "Scala da 1 (Per niente importante) a 5 (Molto importante)" : "Scale from 1 (Not important at all) to 5 (Very important)"}</p>

						<FormField
							control={form.control}
							name="platformInfoUtilityRating"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-3">
											{["1", "2", "3", "4", "5"].map(value => (
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

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "4. Quanto sarebbe interessato a utilizzare una piattaforma che consenta l'acquisizione di clienti in base alle proprie competenze tecniche?" : "4. How interested would you be in using a platform that allows the acquisition of clients based on your technical skills?"}</h3>
						<p className="text-sm text-gray-500 mb-2">{language === "it" ? "Scala da 1 (Per niente importante) a 5 (Molto importante)" : "Scale from 1 (Not important at all) to 5 (Very important)"}</p>

						<FormField
							control={form.control}
							name="platformClientAcquisitionRating"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-3">
											{["1", "2", "3", "4", "5"].map(value => (
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

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "5. Quanto le risulterebbe utile una piattaforma che automatizzi la raccolta dati di inventario per la redazione di EPD?" : "5. How useful would you find a platform that automates inventory data collection for EPD preparation?"}</h3>
						<p className="text-sm text-gray-500 mb-2">{language === "it" ? "Scala da 1 (Per niente importante) a 5 (Molto importante)" : "Scale from 1 (Not important at all) to 5 (Very important)"}</p>

						<FormField
							control={form.control}
							name="platformDataCollectionRating"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-3">
											{["1", "2", "3", "4", "5"].map(value => (
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

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "6. Quanto sarebbe interessato a una piattaforma con funzionalità integrate per la gestione dei progetti EPD (caricamento documenti, raccolta dati automatizzata, chat con il cliente, supporto gestione scadenze e alert)?" : "6. How interested would you be in a platform with integrated features for managing EPD projects (document uploading, automated data collection, client chat, deadline management support and alerts)?"}</h3>
						<p className="text-sm text-gray-500 mb-2">{language === "it" ? "Scala da 1 (Per niente importante) a 5 (Molto importante)" : "Scale from 1 (Not important at all) to 5 (Very important)"}</p>

						<FormField
							control={form.control}
							name="platformProjectManagementRating"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-3">
											{["1", "2", "3", "4", "5"].map(value => (
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

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "7. Quale percentuale del tempo totale dedica, in media, alle attività di acquisizione, onboarding e comunicazione con l'azienda cliente e l'ente certificatore? BARRARE UNA SOLA RISPOSTA" : "7. What percentage of total time do you dedicate, on average, to acquisition, onboarding and communication activities with the client company and the certification body? SELECT ONLY ONE ANSWER"}</h3>

						<FormField
							control={form.control}
							name="timeSpentOnAcquisition"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="5-15" />
												</FormControl>
												<FormLabel className="font-normal">5–15%</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="15-25" />
												</FormControl>
												<FormLabel className="font-normal">15–25%</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="25-35" />
												</FormControl>
												<FormLabel className="font-normal">25–35%</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="more35" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "Più del 35%" : "More than 35%"}</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "8. La piattaforma prevederà un abbonamento che consente l'acquisizione illimitata di clienti. Sarebbe disposto a sostenerne il costo? BARRARE UNA SOLA RISPOSTA" : "8. The platform will include a subscription that allows unlimited client acquisition. Would you be willing to bear the cost? SELECT ONLY ONE ANSWER"}</h3>

						<FormField
							control={form.control}
							name="subscriptionWillingness"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-8">
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="yes" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "SI" : "YES"}</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="no" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "NO" : "NO"}</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<h3 className="text-base font-semibold mt-6">{language === "it" ? "9. È interessato a partecipare alla fase di beta testing della piattaforma? BARRARE UNA SOLA RISPOSTA" : "9. Are you interested in participating in the beta testing phase of the platform? SELECT ONLY ONE ANSWER"}</h3>

						<FormField
							control={form.control}
							name="betaTesting"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-8">
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="yes" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "SI" : "YES"}</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="no" />
												</FormControl>
												<FormLabel className="font-normal">{language === "it" ? "NO" : "NO"}</FormLabel>
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
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>{language === "it" ? "Acconsento al trattamento dei dati forniti ai fini dello sviluppo della piattaforma Sustanet." : "I consent to the processing of the data provided for the development of the Sustanet platform."}</FormLabel>
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
		</div>
	);
};

export default ConsultantSurvey;
