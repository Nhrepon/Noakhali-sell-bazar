import create from "zustand";
import axios from "axios";

const ProductStore = create((set) => ({
  brandList: null,
  getBrandList: async () => {
    const response = await axios.get("/api/productBrandList");
    if (response.data["status"] === "success") {
      set({ brandList: response.data["data"] });
    }
  },

  categoryList: null,
  getCategoryList: async () => {
    const response = await axios.get("/api/productCategoryList");
    if (response.data["status"] === "success") {
      set({ categoryList: response.data["data"] });
    }
  },

  sliderList: null,
  getSliderList: async () => {
    const response = await axios.get("/api/productSliderList");
    if (response.data["status"] === "success") {
      set({ sliderList: response.data["data"] });
    }
  },

  listByRemark: null,
  getRemarkList: async (remark) => {
    set({ listByRemark: null });
    const response = await axios.get(`/api/productListByRemark/${remark}`);
    if (response.data["status"] === "success") {
      set({ listByRemark: response.data["data"] });
    }
  },


  ProductList: null,
  getProductListByBrand: async (id) => {
    set({ ProductList: null });
    const response = await axios.get(`/api/productListByBrand/${id}`);
    if (response.data["status"] === "success") {
      set({ ProductList: response.data["data"] });
    }
  },
  getProductListByCategory: async (id) => {
    set({ ProductList: null });
    const response = await axios.get(`/api/productListByCategory/${id}`);
    if (response.data["status"] === "success") {
      set({ ProductList: response.data["data"] });
    }
  },
  getProductListByKeyword: async (keyword) => {
    set({ ProductList: null });
    const response = await axios.get(`/api/productListByKeyword/${keyword}`);
    if (response.data["status"] === "success") {
      set({ ProductList: response.data["data"] });
    }
  },

  getProductListByFilter: async (postBody) => {
    set({ ProductList: null });
    const response = await axios.post(`/api/productListByFilter`, postBody);
    if (response.data["status"] === "success") {
      set({ ProductList: response.data["data"] });
    }
  },




searchByKeyword:"",
setSearchKeyword:async(keyword)=>{
  set({searchByKeyword:keyword})
},




productDetails:null,
getProductDetails:async(productId)=>{
  set({productDetails:null})
  const response=await axios.get('/api/productDetails/'+productId)
  if(response.data['status']==="success"){
    set({productDetails:response.data['data']})
  }
},



productReviewList:null,
getProductReviewList:async(productId)=>{

  const response=await axios.get('/api/productReviewList/'+productId)
  if(response.data['status']==="success"){
    set({productReviewList:response.data['data']})
  }
},












}));

export default ProductStore;
