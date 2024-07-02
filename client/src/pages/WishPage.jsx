import React from 'react';
import MasterLayout from '../layouts/MasterLayout';
import WishList from '../components/wish/WishList';

const WishPage = () => {
    return (
        <MasterLayout>
            <div className="container">
                <WishList/>
            </div>
        </MasterLayout>
    );
};

export default WishPage;