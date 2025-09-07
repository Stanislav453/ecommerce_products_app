import { useState } from "react";
import { ProdNav, ProdDesc, Reviews } from "../../type";
import { SelectedValue } from "./SelectedValue";

type ProdDescContainerProps = {
  reviews: Reviews[];
  description: string;
};

export const ProdDescContainer = ({
  reviews,
  description,
}: ProdDescContainerProps) => {
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
          description={description}
          reviews={reviews}
        />
      </div>
    </article>
  );
};
