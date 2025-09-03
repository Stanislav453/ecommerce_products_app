import { useState } from "react";
import { ShopItems } from "../../Components/Shop/ShopItems";
import { PageSection } from "../../Components/PageSection";
import { Category, type ProductSummaryResponse } from "../../type";
import { NavLink } from "react-router";
import { ShopFilter } from "./ShopFilter";
import { useFetch } from "../../api/ApiActions/useFetch";

export const ShopContainer = () => {
  const [selectedValue, setselectedValue] = useState<Category>(Category.All);

  // useFetch({ kind: "category" });

  useFetch({kind: "products", query: ""})

  // const { data } = useFetch({ kind: "categories" });
  // const { data } = useFetch({
  //   kind: "product",
  //   id: "4",
  //   query:
  //     "/?select=id,title,images,price,rating,description,category,tags,reviews",
  // });

  const { data } = useFetch({
    kind: "product",
    id: "1",
    query:
      "/?select=id,title,images,price,rating,description,category,tags,reviews",
  });

  console.log("This is data", data);

  // const {
  //   data: response,
  //   loading,
  //   error,
  // } = useFetchData<ProductSummaryResponse>({
  //   selectedValue: selectedValue,
  // });

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error)
  //   return (
  //     <div className="flex flex-col w-full items-center mt-28">
  //       <p className="text-red-600">Something is wrong.</p>
  //       <p>
  //         Please go to
  //         <NavLink to="/" className="font-bold underline	">
  //           Home
  //         </NavLink>
  //         and try it later.
  //       </p>
  //     </div>
  //   );

  // if (response === null) return null;

  return (
    <section>
      <PageSection>
        <h1 className="font-bold text-3xl">Shop</h1>
      </PageSection>
      <div className="flex flex-col items-center py-4 sm:py-0 sm:pb-4 sm:pt-20">
        <div className="w-full  max-w-screen-xl flex flex-col sm:flex-row  gap-12 sm:gap-0 justify-center sm:justify-between items-center px-3">
          <div className="flex">
            This is products
            {/* <p>Showing 1 - {response.products.length} results</p> */}
          </div>
          <ShopFilter setselectedValue={setselectedValue} />
        </div>
      </div>
      {/* <ShopItems shopList={response.products} /> */}
    </section>
  );
};
