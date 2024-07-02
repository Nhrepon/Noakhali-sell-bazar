import React from 'react';
import MasterLayout from '../layouts/MasterLayout';
import CartList from '../components/cart/CartList';

const CartPage = () => {
    return (
        <MasterLayout>
            <div className="container">
                <CartList/>
            </div>
        </MasterLayout>
    );
};

export default CartPage;