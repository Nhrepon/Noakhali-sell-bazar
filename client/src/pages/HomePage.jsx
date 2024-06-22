import React, { useEffect } from "react";
import MasterLayout from "../layouts/MasterLayout";
import ProductStore from "../store/ProductStore";
import FeatureStore from "../store/FeatureStore";
import SliderComponent from "../components/slider/SliderComponent";
import FeaturesComponent from "../components/features/FeaturesComponent";
import CategoriesComponent from "../components/products/CategoriesComponent";
import Products from "../components/products/Products";
import BrandsComponent from "../components/products/BrandsComponent";

const HomePage = () => {
  const {getBrandList, getSliderList, getCategoryList, getRemarkList}=ProductStore();
  const {getFeatureList}=FeatureStore();

  useEffect(() => {
    (async()=>{
      await getBrandList();
      await getSliderList();
      await getCategoryList();
      await getRemarkList("new");
      await getFeatureList();
    })()
  }, []);

  return (
    <MasterLayout>
      <SliderComponent/>
      <FeaturesComponent/>
      <CategoriesComponent/>
      <Products/>
      <BrandsComponent/>
    </MasterLayout>
  );
};

export default HomePage;
