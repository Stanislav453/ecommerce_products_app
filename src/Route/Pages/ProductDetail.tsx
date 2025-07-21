import React from "react";
import { useLocation } from "react-router";
import { PageSection } from "../../Components/PageSection";

export const ProductDetail = () => {
  const location = useLocation();

  console.log(location);

  const { title, thumbnail, price, rating, description, category, tags } =
    location.state;

  return (
    <section>
      <PageSection>{title}</PageSection>
      <div className="flex flex-col items-center">
        <div className=" w-full max-w-screen-lg flex justify-between items-center py-5 px-3">
          <article className="flex">
            <div className="w-full">
              <img src={thumbnail} alt={title} />
            </div>
            <div>
              <h1 className="font-bold text-2xl">{title}</h1>
              <p className="font-bold my-4">${price}</p>
              <p className="mb-2">{rating}</p>
              <p className="mb-2 text-theme-gray-font ">{description}</p>
              <div className="mb-2">PLACE FOR COUNT MANAGER</div>
              <div className="border-t border-theme-gray-border"></div>
              <div className="flex mt-2">
                <p>CATEGORY: {category} </p>{" "}
                <p className="pl-2">
                  TAGS: {tags.map((tag: string) => tag + " ")}{" "}
                </p>{" "}
              </div>
            </div>
          </article>
          <article></article>
        </div>
      </div>
    </section>
  );
};
