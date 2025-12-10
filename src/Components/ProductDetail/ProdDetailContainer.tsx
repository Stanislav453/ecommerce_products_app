import { useSearchParams } from "react-router";
import { ProdDescContainer } from "./ProdDescContainer";
import { ProdDetailViews } from "./ProdDetailViews";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { useGetProduct } from "../../querys/useGetProduct/useGetProduct";

export const ProdDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error, isFetching } = useGetProduct(id);
  
  const id = searchParams.get("id");
  
  if (id === null) return null;
  
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
