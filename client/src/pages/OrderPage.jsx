import React from 'react';
import InvoiceList from '../components/invoice/InvoiceList';
import MasterLayout from '../layouts/MasterLayout';

const OrderPage = () => {
    return (
        <MasterLayout>
            <div className="container">
                <InvoiceList/>
            </div>
        </MasterLayout>
    );
};

export default OrderPage;