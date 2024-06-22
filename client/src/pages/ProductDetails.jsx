import React, { useEffect } from 'react';
import MasterLayout from '../layouts/MasterLayout';
import Details from '../components/products/Details';
import { useParams } from 'react-router';
import ProductStore from '../store/ProductStore';
import BrandsComponent from '../components/products/BrandsComponent';

const ProductDetails = () => {
    const {brandList , getProductDetails, getProductReviewList, getBrandList}=ProductStore();
    const {productId}=useParams();

    useEffect(() => {
        (async () => {
            await getProductDetails(productId);
            await getProductReviewList(productId);
            brandList === null ?  await getBrandList() : null
        })()
    }, [productId]);
    
    return (
        <MasterLayout>
            <div className="container">
                <Details />
                
            </div>
        </MasterLayout>
    );
};

export default ProductDetails;