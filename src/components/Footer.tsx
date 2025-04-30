
import React from "react";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sustanet-darkText text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sustanet</h3>
            <p className="text-gray-300">
              Il marketplace della sostenibilità che connette aziende, consulenti ed enti di certificazione.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Chi siamo</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">La nostra storia</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Team</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Partner</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contatti</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@sustanet.it" className="text-gray-300 hover:text-white transition-colors">Email</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Supporto</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white flex items-center gap-2 hover:text-white transition-colors">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legale</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Termini e Condizioni</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <select
              className="bg-transparent text-gray-300 border border-gray-700 rounded p-2"
              defaultValue="it"
            >
              <option value="it">ITA</option>
              <option value="en">EN</option>
            </select>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sustanet. Tutti i diritti riservati.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
