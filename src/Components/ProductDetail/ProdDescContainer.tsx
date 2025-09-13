import { useState } from "react";
import { ProdNav, Reviews } from "../../type";
import { SelectedValue } from "./SelectedValue";

type ProdDescContainerProps = {
  title: string;
  reviews: Reviews[];
  description: string;
};

export const ProdDescContainer = ({
  title,
  reviews,
  description,
}: ProdDescContainerProps) => {
  const [value, setValue] = useState<ProdNav>(ProdNav.Description);

  const getButtonClass = (buttonValue: ProdNav) =>
    value === buttonValue ? "bg-des-nav-color" : "bg-white border-b-[1px] border-theme-gray-border";

  return (
    <article className="w-full max-w-screen-xl flex flex-col md:flex-row gap-12 justify-between items-start py-5 px-3 ">
      <ul className=" w-full md:w-72">
        <li>
          <button
            className={`w-full text-left text-lg font-medium py-4 px-2 ${getButtonClass(
              ProdNav.Description
            )}`}
            onClick={() => setValue(ProdNav.Description)}
          >
            {ProdNav.Description}
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left text-lg font-medium py-4 px-2  ${getButtonClass(
              ProdNav.Reviews
            )}`}
            onClick={() => setValue(ProdNav.Reviews)}
          >
            {ProdNav.Reviews} ({reviews.length})
          </button>
        </li>
      </ul>
      <ul className="  w-full">
        <SelectedValue
          value={value}
          title={title}
          description={description}
          reviews={reviews}
        />
      </ul>
    </article>
  );
};
