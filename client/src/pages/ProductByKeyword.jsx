import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router";
import MasterLayout from "../layouts/MasterLayout";
import ProductListComponent from "../components/products/ProductListComponent";

const ProductByKeyword = () => {
    const { getProductListByKeyword } = ProductStore();
    const { keyword } = useParams();
  
    useEffect(() => {
      (async () => {
        await getProductListByKeyword(keyword);
      })();
    }, [keyword]);
  
    return (
      <MasterLayout>
        <ProductListComponent />
      </MasterLayout>
    );
};

export default ProductByKeyword;