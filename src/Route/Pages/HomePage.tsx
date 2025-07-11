import React, { useEffect } from "react";
import { Header } from "../../Components/Header/Header";
import { FetchProducts } from "../../api/ApiActions/FetchProducts";
import { useProducts } from "../../Store/useProducts";

export const HomePage = () => {
  const products = useProducts((state: any) => state.products);


  return (
    <div>
      <Header />
    </div>
  );
};
