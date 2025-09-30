import { Link } from "react-router-dom";

type BreadCrumbsViewProps = {
  pathNames: any[];
};

export const BreadCrumbsView = ({ pathNames }: BreadCrumbsViewProps) => {
  return (
    <nav className="flex flex-col items-center py-5 bg-page-sections">
      <ul className=" flex gap-3 flex-row w-full max-w-screen-xl px-3">
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
