import { ProductDetailResponse } from "../../type";
import { RatingContainer } from "../Shop/RatingContainer";

interface ProductDetailViewsProps {
  data: ProductDetailResponse | null;
}

export const ProdDetailViews = ({ data }: ProductDetailViewsProps) => {
  if (data === null) return null;

  const { title, images, price, rating, description, category, tags } = data;

  return (
    <div className=" w-full max-w-screen-xl flex justify-between items-center py-5 px-3">
      <article className="flex flex-col md:flex-row gap-12">
        <div className="basis-full md:basis-[550px] shrink-0 flex justify-center bg-slate-500 rounded-3xl ">
          <img
            className=" md:h-[550px] object-contain"
            src={images[0]}
            alt={title}
          />
        </div>
      <div>
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="font-bold text-xl my-4">${price}</p>
          <div>
          <RatingContainer rating={rating} />

          </div>
          <p className="my-2 text-theme-gray-font ">{description}</p>
          <div className="mb-2">PLACE FOR COUNT MANAGER</div>
          <div className="border-t border-theme-gray-border"></div>
          <div className="flex mt-2">
            <p>
              {" "}
              <span className="font-medium">CATEGORY: </span>
              <span className="text-theme-gray-font">{category}</span>
            </p>
            <p className="pl-2">
              <span className="font-medium">TAGS: </span>{" "}
              <span className="text-theme-gray-font">
                {tags.map((tag: string) => tag + " ")}
              </span>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};
