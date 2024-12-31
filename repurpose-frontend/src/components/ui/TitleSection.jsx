import React from "react";

export default function TitleSection({ title, subtitle }) {
  return (
    <div className="py-8 px-4 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl text-primary">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-secondary-foreground ">{subtitle}</p>
      )}
    </div>
  );
}
