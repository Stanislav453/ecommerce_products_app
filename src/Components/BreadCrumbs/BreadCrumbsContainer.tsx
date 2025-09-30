import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BreadCrumbsView } from "./BreadCrumbsView";

export const BreadCrumbs = () => {
  const [pathNames, setPathNames] = useState<string[]>([]);

  const location = useLocation();
  const path = location.pathname;

  const showBreadCrumbs = path.startsWith("/Shop");
  const showBreadCrumbsProduct = path.startsWith("/Product-detail");

  useEffect(() => {
    const cleanPath = location.pathname.split("/").filter(Boolean)[0];

    if (!cleanPath) return;

    setPathNames((prev) => {
      if (prev[prev.length - 1] === cleanPath) {
        return prev;
      }
      return [...prev, cleanPath];
    });
  }, [location.pathname]);

  console.log(pathNames);

  return (
    <div>
      {(showBreadCrumbs || showBreadCrumbsProduct) && (
        <BreadCrumbsView pathNames={pathNames} />
      )}
    </div>
  );
};
