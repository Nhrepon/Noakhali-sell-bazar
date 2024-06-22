import React, { useEffect } from 'react';
import MasterLayout from '../layouts/MasterLayout';
import LegalContents from '../components/features/LegalContents';
import FeatureStore from '../store/FeatureStore';

const HowToBuyPage = () => {
    const {getLegalDetails}=FeatureStore();

    useEffect(() => {
        (async()=>{
            await getLegalDetails('howtobuy');
        })()
    }, []);



    return (
        <MasterLayout>
            <div className="container">
                <h1 className='text-center p-5'>How to buy Page</h1>
            </div>
                <LegalContents/>
            
        </MasterLayout>
    );
};

export default HowToBuyPage;