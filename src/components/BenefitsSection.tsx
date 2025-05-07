import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, Briefcase, Building2 } from "lucide-react";

const BenefitsSection = () => {
	const { t } = useLanguage();

	const targetBenefits = [
		{
			color: "bg-sustanet-primary",
			title: t("benefits.companies.title"),
			icon: <Building className="w-10 h-10 text-white" />,
			benefits: [t("benefits.companies.benefit1"), t("benefits.companies.benefit2"), t("benefits.companies.benefit3")],
			delay: "0ms"
		},
		{
			color: "bg-sustanet-green-800",
			title: t("benefits.consultants.title"),
			icon: <Briefcase className="w-10 h-10 text-white" />,
			benefits: [t("benefits.consultants.benefit1"), t("benefits.consultants.benefit2"), t("benefits.consultants.benefit3")],
			delay: "200ms"
		},
		{
			color: "bg-sustanet-green-700",
			title: t("benefits.certification.title"),
			icon: <Building2 className="w-10 h-10 text-white" />,
			benefits: [t("benefits.certification.benefit1"), t("benefits.certification.benefit2"), t("benefits.certification.benefit3")],
			delay: "400ms"
		}
	];

	return (
		<section id="benefits" className="section-padding gradient-bg">
			<div className="container mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-sustanet-darkText mb-4">{t("benefits.title")}</h2>
					<p className="text-lg text-gray-600">{t("benefits.subtitle")}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{targetBenefits.map((target, index) => (
						<div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 animate-delayed animate-fade-in" style={{ "--delay": target.delay } as React.CSSProperties}>
							<div className={`${target.color} p-4 text-center`}>
								<h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
									{target.icon}
									{target.title}
								</h3>
							</div>
							<div className="p-6">
								<ul className="space-y-3">
									{target.benefits.map((benefit, i) => (
										<li key={i} className="flex items-start">
											<span className="text-sustanet-primary font-bold mr-2">✓</span>
											<span className="text-gray-700">{benefit}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BenefitsSection;
