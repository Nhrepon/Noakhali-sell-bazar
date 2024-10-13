import React from 'react';
import MasterLayout from '../layouts/MasterLayout';

const NotFound = () => {
    return (
        <MasterLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12 my-3 text-center">
                    <h1>Page Not Found</h1>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default NotFound;