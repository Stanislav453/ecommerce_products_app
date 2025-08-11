import { NavLink, useSearchParams } from "react-router";
import { ProdDesc, ProductDetailResponse } from "../../type";
import { PageSection } from "../PageSection";
import { useFetchData } from "../../api/ApiActions/useFetchData";
import { ProdDescContainer } from "./ProdDescContainer";
import { ProdDetailViews } from "./ProdDetailViews";

export const ProdDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, loading, error } = useFetchData<ProductDetailResponse | null>({
    id: id,
  });

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

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
  if (data === null) return null;

  const { title, description, reviews } = data;

  const prodDesc: ProdDesc[] = [{ description, reviews }];

  return (
    <section>
      <PageSection>
        <h1 className="font-medium">{title}x</h1>
      </PageSection>
      <div className="flex flex-col items-center">
        <ProdDetailViews data={data} />
        <ProdDescContainer prodDesc={prodDesc} />
      </div>
    </section>
  );
};
