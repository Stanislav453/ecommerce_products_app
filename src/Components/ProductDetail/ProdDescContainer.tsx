import { useState } from "react";
import { ProdNav, ProdDesc } from "../../type";
import { SelectedValue } from "./SelectedValue";

type ProdDescContainerProps = {
  prodDesc: ProdDesc[];
};

export const ProdDescContainer = ({ prodDesc }: ProdDescContainerProps) => {
  const [value, setValue] = useState<ProdNav>(ProdNav.Description);

  return (
    <article className="w-full max-w-screen-xl flex gap-12 justify-between items-center py-5 px-3 ">
      <ul className="flex-initial w-72">
        <li>
          <button onClick={() => setValue(ProdNav.Description)}>
            {ProdNav.Description}
          </button>
        </li>
        <li>
          <button onClick={() => setValue(ProdNav.Reviews)}>
            {ProdNav.Reviews}
          </button>
        </li>
      </ul>
      <div className="flex-initial w-full">
        <SelectedValue
          value={value}
          description={prodDesc[0].description}
          reviews={prodDesc[0].reviews}
        />
      </div>
    </article>
  );
};
