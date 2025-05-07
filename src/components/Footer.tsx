import React from "react";
import { Linkedin, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
	const { language, setLanguage, t } = useLanguage();

	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLanguage(e.target.value as "it" | "en");
	};

	return (
		<footer className="bg-sustanet-darkText text-white">
			<div className="container mx-auto py-12 px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-xl font-bold mb-4">Sustanet</h3>
						<p className="text-gray-300">{t("footer.slogan")}</p>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">{t("footer.about")}</h4>
						<ul className="space-y-2">
							<li>
								<a href="#" className="text-gray-300 hover:text-white transition-colors">
									{t("footer.story")}
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-300 hover:text-white transition-colors">
									{t("footer.team")}
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-300 hover:text-white transition-colors">
									{t("footer.partners")}
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">{t("footer.contacts")}</h4>
						<ul className="space-y-2">
							<li>
								<a href="mailto:info@sustanet.it" className="text-gray-300 hover:text-white transition-colors">
									Email
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-300 hover:text-white transition-colors">
									{t("footer.support")}
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-300 flex items-center gap-2 hover:text-white transition-colors">
									<Linkedin size={18} />
									<span>LinkedIn</span>
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">{t("footer.legal")}</h4>
						<ul className="space-y-2">
							<li>
								<a href="#" className="text-gray-300 hover:text-white transition-colors">
									{t("footer.privacy")}
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-300 hover:text-white transition-colors">
									{t("footer.terms")}
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-300 hover:text-white transition-colors">
									{t("footer.cookies")}
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0 flex items-center space-x-2">
						<Globe size={16} className="text-gray-300" />
						<select className="bg-transparent text-gray-300 border border-gray-700 rounded p-2" value={language} onChange={handleLanguageChange} aria-label="Select language">
							<option value="it">ITA</option>
							<option value="en">EN</option>
						</select>
					</div>
					<div className="text-gray-400 text-sm">
						© {new Date().getFullYear()} Sustanet. {t("footer.rights")}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
