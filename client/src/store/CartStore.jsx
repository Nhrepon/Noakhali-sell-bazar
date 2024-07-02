import React from 'react';
import { create } from 'zustand';
import { unauthorized } from '../utility/Utility';
import axios from 'axios';

const CartStore = create((set)=>({

    isCartSubmit:false,
    cartForm:{productId:"", color:"", size:""},
    cartFormOnChange: (name, value)=>{
        set((state)=>({
            cartForm:{
                ...state.cartForm,
                [name]:value
            }
        }))
    },
    cartSave:async(postBody, productId, quantity)=>{
        try {
            set({isCartSubmit:true})
            postBody.productId=productId;
            postBody.quantity=quantity;
            const response=await axios.post('/api/saveCartList', postBody);
            set({isCartSubmit:false})
            return response.data['status']==="success";
        } catch (error) {
            unauthorized(error.response.status);
        }
    },

    cartList: null,
    cartCount: 0,
    cartTotal:0,
    vatTotal: 0,
    payableTotal: 0,
    getCartList: async()=>{
        try {
            const response=await axios.get('/api/cartList');
            set({cartList:response.data['data']});
            set({cartCount:(response.data['data']).length});
            let total=0;
            let vat=0;
            let payable=0;
            response.data['data'].forEach((item, i) => {
                if (item['product']['discount']===true) {
                    total=total + parseFloat(item['quantity']) * parseFloat(item['product']['discountPrice']);
                }else{
                    total=total + parseFloat(item['quantity']) * parseFloat(item['product']['price']);
                }
            });
            vat=total*0.05;
            payable=total+vat;
            set({cartTotal:total});
            set({vatTotal:vat});
            set({payableTotal:payable});

        } catch (error) {
            unauthorized(error.response.status);
        }
    },

    removeCartList:async(cartId)=>{
        try {
            const response=await axios.post('/api/deleteCartList', {"_id":cartId});
            return response.data['status']==="success";
        } catch (error) {
            unauthorized(error.response.status);
        }
    },

    createInvoice:async()=>{
        try {
            set({isCartSubmit: true});
            const response=await axios.post('/api/createInvoice');
            set({isCartSubmit: false});
            window.location.href = response.data['data']['GatewayPageURL'];
            return response.data['status']==="success";
        } catch (error) {
            unauthorized(error.response.status);
        }
    },


    invoiceList:null,
    getInvoiceList:async()=>{
        try {
            const response=await axios.get('/api/invoiceList');
            set({invoiceList:response.data['data']});
        } catch (error) {
            unauthorized(error.response.status);
        }
    }, 

    invoiceDetails:null, 
    getInvoiceDetails: async (id) => {
        try {
            const response = await axios.get('/api/invoiceProductList/' + id);
            set({ invoiceDetails: response.data['data'] });
        } catch (error) {
            unauthorized(error.response.status);
    }
},







}));

export default CartStore;