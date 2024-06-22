import React from 'react';
import FeatureStore from '../../store/FeatureStore';
import LoaderComponent from '../../loaders/LoaderComponent';
import parse from 'html-react-parser';

const LegalContents = () => {
    
    const {legalDetails}=FeatureStore();

    if(legalDetails===null){
        return (<LoaderComponent/>)
    }else{
    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-12">
                    <div className="card p-4">
                        {
                            parse(legalDetails[0]['description'])
                        }
                    </div>
                </div>
            </div>
        </div>
    );
} 


}

export default LegalContents;