import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const BreadCrumbs = () => {
  const location = useLocation();
  const [pathNames, setPathNames] = useState<string[]>([]);

  useEffect(() => {
    setPathNames((prev) => {
      // ak už tam URL je, nepridávaj ju znova
      if (prev[prev.length - 1] === location.pathname) {
        return prev;
      }
      return [...prev, location.pathname];
    });
  }, [location.pathname]);

  console.log(pathNames);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathNames.map((path, index) => (
          <li key={index}>
            <Link to={path}>{path}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
