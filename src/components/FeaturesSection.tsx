
import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      icon: "✅",
      title: "Onboarding personalizzato",
      description: "Percorso guidato per aziende, consulenti e enti di certificazione",
      delay: "0ms",
    },
    {
      icon: "🤖",
      title: "AI Matching",
      description: "Algoritmo avanzato tra richieste e competenze verificate",
      delay: "100ms",
    },
    {
      icon: "📥",
      title: "Import automatico dati",
      description: "Semplificazione del processo di acquisizione dati d'inventario per EPD",
      delay: "200ms",
    },
    {
      icon: "📈",
      title: "Monitoraggio progetto",
      description: "Controllo in tempo reale con alert e notifiche personalizzate",
      delay: "300ms",
    },
  ];

  return (
    <section id="features" className="section-padding gradient-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sustanet-darkText mb-4">
            <span className="text-sustanet-primary">🎯</span> Cosa offre la piattaforma
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow animate-delayed animate-fade-in flex flex-col"
              style={{ "--delay": feature.delay } as React.CSSProperties}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-sustanet-darkText">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
