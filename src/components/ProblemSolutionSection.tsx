
import React from "react";

const ProblemSolutionSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Problem */}
          <div id="problem" className="bg-gray-100 rounded-xl p-8 shadow-sm border border-gray-200 animate-delayed animate-fade-in" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <div className="flex items-center mb-6">
              <div className="bg-red-500 text-white rounded-full p-2 mr-4">
                <span className="text-xl font-bold">⛔</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Il problema oggi</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Le aziende faticano a trovare consulenti qualificati per EPD, LCA e CFP. I consulenti non riescono a entrare in contatto con i clienti giusti. Gli enti di certificazione sono spesso coinvolti troppo tardi.
            </p>
            <p className="text-gray-700 mt-4 font-semibold">
              Tutto ciò genera errori, costi, e rework.
            </p>
          </div>

          {/* Solution */}
          <div id="solution" className="bg-sustanet-lightBg rounded-xl p-8 shadow-sm border border-sustanet-secondary animate-delayed animate-fade-in" style={{ "--delay": "300ms" } as React.CSSProperties}>
            <div className="flex items-center mb-6">
              <div className="bg-sustanet-primary text-white rounded-full p-2 mr-4">
                <span className="text-xl font-bold">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">La nostra soluzione</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Sustanet è la prima piattaforma internazionale che usa intelligenza artificiale per automatizzare il matching tra domanda e offerta di servizi di sostenibilità.
            </p>
            <p className="text-sustanet-primary mt-4 font-bold text-lg">
              Zero rework. Massima efficienza.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
