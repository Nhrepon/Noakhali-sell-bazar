import React from 'react';
import ProductListComponent from '../components/products/ProductListComponent';
import MasterLayout from '../layouts/MasterLayout';

const ProductListPage = () => {
    return (
        <MasterLayout>
            <div className='container'>
            <ProductListComponent/>
        </div>
        </MasterLayout>
    );
};

export default ProductListPage;