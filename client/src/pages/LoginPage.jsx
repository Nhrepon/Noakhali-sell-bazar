import React from 'react';
import LoginForm from '../components/user/LoginForm';
import MasterLayout from '../layouts/MasterLayout';

const LoginPage = () => {
    return (
        <MasterLayout>
            <LoginForm/>
        </MasterLayout>
    );
};

export default LoginPage;