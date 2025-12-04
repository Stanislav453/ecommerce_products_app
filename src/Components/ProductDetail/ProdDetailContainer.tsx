import { useSearchParams } from "react-router";
import { ProdDescContainer } from "./ProdDescContainer";
import { ProdDetailViews } from "./ProdDetailViews";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { useGetProduct } from "../../querys/UseGetProduct/UseGetProduct";

export const ProdDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, error, isFetching } = useGetProduct(id);
  
  if (id === null) {
    return null;
  }

  if (error) {
    return <ApiCallError error={error} />;
  }

  if (isFetching) {
    return <ApiCallLoading />;
  }

  if (data === undefined) {
    return null;
  }

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
