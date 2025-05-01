
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <a href="#problem" className="text-sustanet-darkText hover:text-sustanet-primary transition-colors">
            Problema
          </a>
          <a href="#solution" className="text-sustanet-darkText hover:text-sustanet-primary transition-colors">
            Soluzione
          </a>
          <a href="#features" className="text-sustanet-darkText hover:text-sustanet-primary transition-colors">
            Caratteristiche
          </a>
          <a href="#workflow" className="text-sustanet-darkText hover:text-sustanet-primary transition-colors">
            Come Funziona
          </a>
          <a href="#benefits" className="text-sustanet-darkText hover:text-sustanet-primary transition-colors">
            Vantaggi
          </a>
          <select
            className="bg-transparent text-sustanet-darkText border-none cursor-pointer"
            defaultValue="it"
          >
            <option value="it">ITA</option>
            <option value="en">EN</option>
          </select>
          <Button variant="outline" className="ml-2">
            Accedi
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
              href="#problem"
              className="text-sustanet-darkText hover:text-sustanet-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Problema
            </a>
            <a
              href="#solution"
              className="text-sustanet-darkText hover:text-sustanet-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Soluzione
            </a>
            <a
              href="#features"
              className="text-sustanet-darkText hover:text-sustanet-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Caratteristiche
            </a>
            <a
              href="#workflow"
              className="text-sustanet-darkText hover:text-sustanet-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Come Funziona
            </a>
            <a
              href="#benefits"
              className="text-sustanet-darkText hover:text-sustanet-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Vantaggi
            </a>
            <select
              className="bg-transparent text-sustanet-darkText border border-gray-300 rounded p-2"
              defaultValue="it"
            >
              <option value="it">ITA</option>
              <option value="en">EN</option>
            </select>
            <Button className="w-full">Accedi</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
