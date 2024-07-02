import React from 'react';
import { create } from 'zustand';
import { unauthorized } from '../utility/Utility';
import axios from 'axios';

const ReviewStore = create((set) => ({

    isReviewSubmit: false,
    reviewFormData: {
        productId: "",
        description: "",
        rating: "5"
    },
    reviewFromOnChange: (name, value) => {
        set((state) => ({
            reviewFormData: {
                ...state.reviewFormData,
                [name]: value
            }
        }))
    },

    saveReview: async (postBody) => {
        try {
            set({isReviewSubmit:true})
        const response = await axios.post('/api/createReview', postBody);
        set({isReviewSubmit:false})
        return response.data["status"] === "success";
        } catch (error) {
            unauthorized(error.response.status);
        }
    }




}));


export default ReviewStore;