import { useFetchData } from "../../api/ApiActions/useFetchData";
import { useSearchParams } from "react-router";
import type { ProductDetailResponse } from "../../type";
import { PageSection } from "../../Components/PageSection";

export const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, loading } = useFetchData<ProductDetailResponse | null>(
    `/products/${id}?select=id,title,thumbnail,price,rating,description,category,tags,reviews`
  );

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section>
      <PageSection>
        <h1 className="font-medium">{data?.title}x</h1>
      </PageSection>
      <div className="flex flex-col items-center">
        <div className=" w-full max-w-screen-xl flex justify-between items-center py-5 px-3">
          <article className="flex">
            <div className="w-full flex justify-center bg-slate-500">
              <img src={data?.thumbnail} alt={data?.title} />
            </div>
            <div>
              <h1 className="font-bold text-3xl">{data?.title}</h1>
              <p className="font-bold text-xl my-4">${data?.price}</p>
              <p className="mb-2">{data?.rating}</p>
              <p className="mb-2 text-theme-gray-font ">{data?.description}</p>
              <div className="mb-2">PLACE FOR COUNT MANAGER</div>
              <div className="border-t border-theme-gray-border"></div>
              <div className="flex mt-2">
                <p>CATEGORY: {data?.category} </p>{" "}
                <p className="pl-2">
                  TAGS: {data?.tags.map((tag: string) => tag + " ")}{" "}
                </p>
              </div>
            </div>
          </article>
          <article></article>
        </div>
      </div>
    </section>
  );
};
