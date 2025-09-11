import React from "react";

interface PageSectionType {
  children: React.ReactNode;
}

export const PageSection = ({ children }: PageSectionType) => {
  return (
    <header className="flex flex-col items-center py-5 bg-page-sections">
      <div className="w-full max-w-screen-xl px-3">
        {children}
      </div>
    </header>
  );
};
