import React from "react";
import { User, Briefcase, Users, Monitor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const WorkflowSection = () => {
	const { t } = useLanguage();
	const isMobile = useIsMobile();

	const steps = [
		{
			icon: <User className="w-10 h-10 text-sustanet-primary" />,
			title: t("workflow.step1.title"),
			description: t("workflow.step1.description"),
			delay: "0ms",
			image: "/lovable-uploads/5e656f62-64a8-4767-906d-db3c2a06623d.png"
		},
		{
			icon: <Users className="w-10 h-10 text-sustanet-primary" />,
			title: t("workflow.step2.title"),
			description: t("workflow.step2.description"),
			delay: "200ms",
			image: "/lovable-uploads/954c639e-edf0-4555-a5d9-aa731f30a2f6.png"
		},
		{
			icon: <Briefcase className="w-10 h-10 text-sustanet-primary" />,
			title: t("workflow.step3.title"),
			description: t("workflow.step3.description"),
			delay: "400ms",
			image: "/lovable-uploads/3c6d6f6c-c284-4d0c-870d-5bdac9971d26.png"
		},
		{
			icon: <Monitor className="w-10 h-10 text-sustanet-primary" />,
			title: t("workflow.step4.title"),
			description: t("workflow.step4.description"),
			delay: "600ms",
			image: "/lovable-uploads/a43230c1-8613-4978-ba82-9c8f111b50c4.png"
		}
	];

	return (
		<section id="workflow" className="section-padding bg-white">
			<div className="container mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-sustanet-darkText mb-4">{t("workflow.title")}</h2>
					<p className="text-lg text-gray-600">{t("workflow.subtitle")}</p>
				</div>

				<div className="grid grid-cols-1 gap-16">
					{steps.map((step, index) => (
						<div key={index} className={`flex flex-col ${index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 animate-delayed animate-fade-in`} style={{ "--delay": step.delay } as React.CSSProperties}>
							<div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
								<img src={step.image} alt={t(`workflow.step${index + 1}.title`)} className="w-full object-contain bg-white" />
							</div>

							<div className="w-full md:w-1/2 p-6">
								<div className="flex items-center mb-4 gap-4">
									<div className="bg-white border-4 border-sustanet-secondary rounded-full p-3">{step.icon}</div>
									<h3 className="text-2xl font-bold text-sustanet-darkText flex items-center gap-2">
										<span className="flex justify-center items-center w-8 h-8 rounded-full bg-sustanet-primary text-white font-bold text-sm">{index + 1}</span>
										{step.title}
									</h3>
								</div>
								<p className="text-gray-600 text-lg">{step.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WorkflowSection;
