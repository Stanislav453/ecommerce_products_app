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
    <article>
      <ul>
        {prodNav.map((nav, index) => (
          <li key={index}>
            <button
              className="border-2 border-black p-2 mt-2"
              onClick={() => setValue(nav)}
            >
              {nav.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <SelectedValue value={value} prodDesc={prodDesc} />
    </article>
  );
};
