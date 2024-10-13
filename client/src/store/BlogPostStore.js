import {create} from 'zustand';
import axios from 'axios';


const BlogPostStore = create((set)=>({

    blogPostList: null,

    getBlogPostList: async () => {
        set({ blogPostList: null });
        const response = await axios.get('/api/blogPostList');

        if (response.data["status"] == "success") {
            set({ blogPostList: response.data["data"] });
        }
    },



}));

export default BlogPostStore;