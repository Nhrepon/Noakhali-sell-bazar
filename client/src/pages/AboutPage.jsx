import React, { useEffect } from 'react';
import MasterLayout from '../layouts/MasterLayout';
import LegalContents from '../components/features/LegalContents';
import FeatureStore from '../store/FeatureStore';

const AboutPage = () => {


    const {getLegalDetails}=FeatureStore();

    useEffect(() => {
        (async()=>{
            await getLegalDetails('about');
        })()
    }, []);



    return (
        <MasterLayout>
            <div className="container">
                <h1 className='text-center p-5'>About Page</h1>
            </div>
                <LegalContents/>
            
        </MasterLayout>
    );

};

export default AboutPage;