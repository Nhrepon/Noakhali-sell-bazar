import React, { useEffect } from 'react';
import MasterLayout from '../layouts/MasterLayout';
import LegalContents from '../components/features/LegalContents';
import FeatureStore from '../store/FeatureStore';

const RefundPage = () => {
    const {getLegalDetails}=FeatureStore();

    useEffect(() => {
        (async()=>{
            await getLegalDetails('refund');
        })()
    }, []);



    return (
        <MasterLayout>
            <div className="container">
                <h1 className='text-center p-5'>Refund Page</h1>
            </div>
                <LegalContents/>
            
        </MasterLayout>
    );
};

export default RefundPage;