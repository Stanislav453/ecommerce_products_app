import { useSearchParams } from "react-router";
import { ProdDescContainer } from "./ProdDescContainer";
import { ProdDetailViews } from "./ProdDetailViews";
// import { shopRepository } from "../../api/shopRepository";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { getProduct } from "../../api/apiRequestRepository";

export const ProdDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  if (id === null) return <ApiCallError error={error} />;

  const { data, isLoading, error, isFetching } =
    getProduct(id);

  if (error) return <ApiCallError error={error} />;

  if (isLoading || isFetching) return <ApiCallLoading />;

  if (data === null) return null;

  if (!data) return <ApiCallError error={error} />;

  return (
    <section>
      <div className="flex flex-col items-center">
        <ProdDetailViews data={data} />
        <ProdDescContainer
          title={data.title}
          description={data.description}
          reviews={data.reviews}
          id={id}
        />
      </div>
    </section>
  );
};
