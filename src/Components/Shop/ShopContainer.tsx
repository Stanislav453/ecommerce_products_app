import { ShopItems } from "../../Components/Shop/ShopItems";
import { PageSection } from "../../Components/PageSection";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { ShopFilter } from "./ShopFilter";
import { useState } from "react";
// import { shopRepository } from "../../api/shopRepository";

export const ShopContainer = () => {
  const [selectFilterValue, setselectedValue] = useState("all");

  // const { data, error, isLoading, isFetching } =
  //   shopRepository.shopProductsSummury(selectFilterValue);

  // if (error) return <ApiCallError error={error} />;

  // if (isLoading || isFetching) return <ApiCallLoading />;

  // if (!data) return null;


  //  useQuery({
  //     queryKey: ["products", category],
  //     queryFn: () =>
  //       fetchBuilder<ProductSummaryResponse>({
  //         method: "GET",
  //         variant: "category",
  //         categoryName: category,
  //         params: "id,title,thumbnail,price,rating",
  //       }),
  //   })

  return (
    <section>
      <PageSection>
        <h1 className="font-bold text-3xl">Shop</h1>
      </PageSection>
      <div className="flex flex-col items-center py-4 sm:py-0 sm:pb-4 sm:pt-20">
        <div className="w-full  max-w-screen-xl flex flex-col sm:flex-row  gap-12 sm:gap-0 justify-center sm:justify-between items-center px-3">
          <div className="flex">
            This is products
            {/* <p>Showing 1 - {data.products.length} results</p> */}
          </div>
          <div>
            <ShopFilter setselectedValue={setselectedValue} />
          </div>
        </div>
      </div>
      {/* <ShopItems shopList={data.products} /> */}
    </section>
  );
};
