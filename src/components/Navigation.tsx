
import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'it' | 'en');
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center">
          <a href="#" className="flex items-center text-sustanet-darkText">
            <Logo size={isScrolled ? "sm" : "md"} />
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sustanet-darkText hover:text-sustanet-primary transition-colors">
            HOME
          </a>
          <div className="flex items-center space-x-1 text-sustanet-darkText">
            <Globe size={16} />
            <select
              className="bg-transparent text-sustanet-darkText border-none cursor-pointer"
              value={language}
              onChange={handleLanguageChange}
              aria-label="Select language"
            >
              <option value="it">ITA</option>
              <option value="en">EN</option>
            </select>
          </div>
          <Button variant="outline" className="ml-2">
            {t('nav.priorityAccess')}
          </Button>
        </div>

        <button
          className="md:hidden text-sustanet-darkText"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            <a
              href="#"
              className="text-sustanet-darkText hover:text-sustanet-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </a>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <Globe size={16} className="mr-2" />
              <select
                className="bg-transparent text-sustanet-darkText border-none w-full"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="it">ITA</option>
                <option value="en">EN</option>
              </select>
            </div>
            <Button className="w-full">
              {t('nav.priorityAccess')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
