
import React from "react";
import { Building, Briefcase, User } from "lucide-react";

const BenefitsSection = () => {
  const targetBenefits = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      color: "bg-sustanet-blue",
      title: "🏢 Aziende",
      benefits: [
        "Risparmio di tempo e costi (fino a 10.000€/progetto)",
        "Accesso a consulenti verificati e matching istantaneo",
        "Nessun errore iniziale: onboarding tecnico accurato"
      ],
      delay: "0ms",
    },
    {
      icon: <User className="w-10 h-10" />,
      color: "bg-sustanet-orange",
      title: "👩‍💼 Consulenti",
      benefits: [
        "Opportunità già profilate, senza spese di marketing",
        "Caricamento CV e selezione dei settori di competenza",
        "Area personale, rating, e gestione progetti semplificata"
      ],
      delay: "200ms",
    },
    {
      icon: <Building className="w-10 h-10" />,
      color: "bg-sustanet-purple",
      title: "🏛 Enti di certificazione",
      benefits: [
        "Coinvolgimento anticipato nel flusso",
        "Dossier clienti ordinati e standardizzati",
        "Sincronizzazione automatica delle fasi"
      ],
      delay: "400ms",
    }
  ];

  return (
    <section id="benefits" className="section-padding gradient-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sustanet-darkText mb-4">
            Vantaggi per ciascun target
          </h2>
          <p className="text-lg text-gray-600">Scopri i benefici specifici per il tuo ruolo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targetBenefits.map((target, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 animate-delayed animate-fade-in"
              style={{ "--delay": target.delay } as React.CSSProperties}
            >
              <div className={`${target.color} p-4 flex items-center gap-3`}>
                <div className="bg-white rounded-full p-2 text-white">
                  {target.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{target.title}</h3>
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
