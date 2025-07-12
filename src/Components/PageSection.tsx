import React from "react";

interface PageSectionType {
  children: React.ReactNode;
}

export const PageSection = ({ children }: PageSectionType) => {
  return (
    <header className=" flex flex-col items-center py-5 bg-page-sections">
      <div className="w-full max-w-screen-lg flex justify-between" >
        <h1 className="font-medium text-5xl">{children}</h1>
      </div>
    </header>
  );
};
