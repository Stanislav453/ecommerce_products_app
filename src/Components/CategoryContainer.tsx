import { Link, NavLink, useParams } from "react-router-dom";
import { ShopItems } from "./Shop/ShopItems";
import { useFetch } from "../api/ApiActions/fetchData/useFetch";
import { CategoryNames, ProductSummaryResponse } from "../type";
import loadingSpinner from "../../public/loadingSpinner.svg";
import { PageSection } from "./PageSection";

export const CategoryContainer = () => {
  const { categoryName } = useParams<{ categoryName: CategoryNames }>();

  if (categoryName == null) return null;

  const { data, loading, error } = useFetch<ProductSummaryResponse>({
    kind: "category",
    name: categoryName,
    query: "?select=id,title,thumbnail,price,rating,description",
  });

  if (error)
    return (
      <div className="flex flex-col w-full items-center mt-28">
        <p className="text-red-600">Something is wrong.</p>
        <p>
          Please go to
          <NavLink to="/" className="font-bold underline	">
            Home
          </NavLink>
          and try it later.
        </p>
      </div>
    );

  if (loading) {
    return (
      <div className="flex justify-center">
        <img className="w-11" src={loadingSpinner} alt="loadingSpinner" />
      </div>
    );
  }

  if (data == null) return null;

  return (
    <section>
      <PageSection>
        <ul className="flex gap-1">
          <li>
            <Link to="/">
              {" "}
              <span className="text-theme-gray-font underline">Home</span> /
            </Link>
          </li>
          <li>{categoryName}</li>
        </ul>
        <h1 className="text-3xl font-semibold mt-3">{categoryName}</h1>
      </PageSection>
      <div className="w-full flex justify-center mb-5 mt-10">
        <div className="w-full  max-w-screen-xl flex justify-center sm:justify-start px-3">
          <p>Showing 1 - {data.products.length} results</p>
        </div>
      </div>
      <ShopItems shopList={data.products} />
    </section>
  );
};
