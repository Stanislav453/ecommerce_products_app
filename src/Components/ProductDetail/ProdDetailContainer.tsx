import { NavLink, useSearchParams } from "react-router";
import { ProductDetailResponse } from "../../type";
import { PageSection } from "../PageSection";
import { ProdDescContainer } from "./ProdDescContainer";
import { ProdDetailViews } from "./ProdDetailViews";
import { useFetch } from "../../api/ApiActions/useFetch";
import loadingSpinner from "../../../public/loadingSpinner.svg";

export const ProdDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, loading, error } = useFetch<ProductDetailResponse>({
    kind: "product",
    id: id,
    query:
      "?select=id,title,images,price,rating,description,category,tags,reviews",
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

  if (data === null) return null;

  return (
    <section>
      <PageSection>
        <h1 className="font-medium">{data.title}</h1>
      </PageSection>
      <div className="flex flex-col items-center">
        <ProdDetailViews data={data} />
        <ProdDescContainer
        title={data.title}
          description={data.description}
          reviews={data.reviews}
        />
      </div>
    </section>
  );
};
