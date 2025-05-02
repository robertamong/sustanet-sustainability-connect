
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
      {showText && (
        <span className={cn("font-bold tracking-tight flex items-center", sizeClasses[size], textClassName)}>
          <span className="text-sustanet-primary">Susta</span>
          <span className="text-sustanet-primary">ne</span>
          <span className="text-sustanet-primary">
            <Sprout 
              size={iconSizes[size] * 0.8} 
              className="inline-block" 
              strokeWidth={2} 
            />
          </span>
        </span>
      )}
    </div>
  );
};

export default Logo;
