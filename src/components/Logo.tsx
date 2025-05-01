
import React from "react";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({
  className,
  textClassName,
  iconClassName,
  showText = true,
  size = "md",
}: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl md:text-4xl",
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("text-sustanet-primary", iconClassName)}>
        <Sprout 
          size={iconSizes[size]} 
          className="stroke-current" 
          strokeWidth={2} 
        />
      </span>
      {showText && (
        <span className={cn("font-bold tracking-tight", sizeClasses[size], textClassName)}>
          <span className="text-sustanet-primary">Susta</span>
          <span className="text-sustanet-darkText">net</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
