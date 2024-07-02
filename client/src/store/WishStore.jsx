import React from 'react';
import { create } from 'zustand';
import axios from 'axios';
import { unauthorized } from '../utility/Utility';

const WishStore = create((set) => ({
    isWishSubmit: false,
    saveWishList: async (productId) => {
        try {
            set({ isWishSubmit: true });
            const response = await axios.post('/api/saveWishList', {productId: productId});
            set({ isWishSubmit: false });
            return response.data['status'] === 'success';
        } catch (error) {
            unauthorized(error.response.status);
        }
    },

    wishList: null,
    wishCount: 0,
    getWishList: async () => {
        try {
            const response = await axios.get('/api/wishList');
            set({ wishList: response.data['data'] });
            set({ wishCount: (response.data['data']).length });
        } catch (error) {
            unauthorized(error.response.status);
        }
    },

    removeWishList: async (productId) => {
        try {
            set({ wishList:null });
            const response = await axios.post('/api/removeWishList', { productId: productId });
            return response.data['status'] === 'success';
        } catch (error) {
            unauthorized(error.response.status);
        }
    },
   




}));

export default WishStore;