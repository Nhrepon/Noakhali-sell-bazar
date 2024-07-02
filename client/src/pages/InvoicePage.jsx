import React from 'react';
import MasterLayout from '../layouts/MasterLayout';
import InvoiceDetails from '../components/invoice/InvoiceDetails';

const InvoicePage = () => {
    return (
        <MasterLayout>
            <div className="container">
                <InvoiceDetails/>
            </div>
        </MasterLayout>
    );
};

export default InvoicePage;