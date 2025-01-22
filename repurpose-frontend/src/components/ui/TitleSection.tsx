import React from "react";

interface TitleSectionProps {
  title: string;
  subtitle?: string;
  variant?: "center" | "left";
}

export default function TitleSection({ title, subtitle, variant = "center" }: TitleSectionProps) {
  const alignmentClass = variant === "left" ? "text-left" : "text-center";

  return (
    <div className={`py-8 px-4 ${alignmentClass}`}>
      <h1 className="text-3xl font-bold sm:text-4xl text-primary">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-secondary-foreground">{subtitle}</p>
      )}
    </div>
  );
}