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
    getCartList: async()=>{
        try {
            const response=await axios.get('/api/cartList');
            set({cartList:response.data['data']});
            set({cartCount:(response.data['data']).length});
        } catch (error) {
            unauthorized(error.response.status);
        }
    },





}));

export default CartStore;