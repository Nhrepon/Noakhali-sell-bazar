import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductByBrand from './pages/ProductByBrand';
import ProductByCategory from './pages/ProductByCategory';
import ProductByKeyword from './pages/ProductByKeyword';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import WishPage from './pages/WishPage';
import ProductDetails from './pages/ProductDetails';
import RefundPage from './pages/RefundPage';
import TermsPage from './pages/TermsPage';
import HowToBuyPage from './pages/HowToBuyPage';
import ComplainPage from './pages/ComplainPage';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import UserStore from './store/UserStore';
import NotFound from './pages/NotFound';
import ProductListPage from './pages/ProductListPage';
import OrderPage from './pages/OrderPage';
import InvoicePage from './pages/InvoicePage';

const App = () => {

  const {isLogin}=UserStore();


  if(isLogin()){
    return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/blog" element={<BlogPage/>} />
        <Route path="/products" element={<ProductListPage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/how-to-buy" element={<HowToBuyPage />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/complain" element={<ComplainPage/>} />

        
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/otp" element={<OtpPage/>} />

        <Route path="/listByBrand/:id" element={<ProductByBrand/>} />
        <Route path="/listByCategory/:id" element={<ProductByCategory/>} />
        <Route path="/listByKeyword/:keyword" element={<ProductByKeyword/>} />
        <Route path="/details/:productId" element={<ProductDetails/>} />

        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/wish" element={<WishPage/>} /> 

        <Route path="/orders" element={<OrderPage/>} />   
        <Route path="/invoice/:id" element={<InvoicePage/>} />   
            
        <Route path="*" element={<NotFound/>} />
        
        
      </Routes>
    </BrowserRouter>
    </>
    ); 
  }else{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/blog" element={<BlogPage/>} />
        <Route path="/products" element={<ProductListPage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/how-to-buy" element={<HowToBuyPage />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/complain" element={<ComplainPage/>} />

        
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/otp" element={<OtpPage/>} />

        <Route path="/listByBrand/:id" element={<ProductByBrand/>} />
        <Route path="/listByCategory/:id" element={<ProductByCategory/>} />
        <Route path="/listByKeyword/:keyword" element={<ProductByKeyword/>} />
        <Route path="/details/:productId" element={<ProductDetails/>} />
  
            
        <Route path="*" element={<NotFound/>} />
        
        
      </Routes>
    </BrowserRouter>
  );
}



};

export default App;