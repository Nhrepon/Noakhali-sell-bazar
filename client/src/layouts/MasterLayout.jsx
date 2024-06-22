import React from 'react';
import TopNavigation from '../components/layout/TopNavigation';
import Footer from '../components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const MasterLayout = (props) => {
    return (
        <div>
            <TopNavigation/>
            <div className="container-fluid">
                {props.children}
            </div>  
            <Footer/> 
            <Toaster position="top-center" />
        </div>
    );
};

export default MasterLayout;