import { useSearchParams } from "react-router";
import { ProdDescContainer } from "./ProdDescContainer";
import { ProdDetailViews } from "./ProdDetailViews";
import { shopRepository } from "../../api/shopRepository";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";

export const ProdDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  if (id === null) return <ApiCallError />;

  const { data, isLoading, error, isFetching } =
    shopRepository.shopProductDetail.useQuery(id);

  if (error) return <ApiCallError />;

  if (isLoading || isFetching) return <ApiCallLoading />;

  if (data === null) return null;

  if (!data) return <ApiCallError />;

  return (
    <section>
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
