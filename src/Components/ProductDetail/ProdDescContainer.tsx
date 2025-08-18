import { useState } from "react";
import { ProdNav, ProdDesc } from "../../type";
import { SelectedValue } from "./SelectedValue";

type ProdDescContainerProps = {
  prodDesc: ProdDesc[];
};

export const ProdDescContainer = ({ prodDesc }: ProdDescContainerProps) => {
  const [value, setValue] = useState<ProdNav>(ProdNav.Description);
  const prodNav = [ProdNav.Description, ProdNav.Reviews];

  return (
    <article className="w-full max-w-screen-xl flex gap-12 justify-between items-center py-5 px-3 ">
      <ul className="flex-initial w-72">
        {prodNav.map((nav, index) => (
          <li key={index}>
            <button
              className="w-full text-left py-5 pl-4 bg-page-sections"
              onClick={() => setValue(nav)}
            >
              {nav.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex-initial w-full">
        <SelectedValue value={value} prodDesc={prodDesc} />
      </div>
    </article>
  );
};
