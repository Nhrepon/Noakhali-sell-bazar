import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router";
import MasterLayout from "../layouts/MasterLayout";
import ProductListComponent from "../components/products/ProductListComponent";

const ProductByCategory = () => {
    const { getProductListByCategory } = ProductStore();
    const { id } = useParams();
  
    useEffect(() => {
      (async () => {
        await getProductListByCategory(id);
      })();
    }, [id]);
  
    return (
      <MasterLayout>
        <ProductListComponent />
      </MasterLayout>
    );
};

export default ProductByCategory;