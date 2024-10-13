import React from 'react';
import MasterLayout from '../layouts/MasterLayout';
import BlogPostComponent from '../components/blog/BlogPostComponent';

const BlogPage = () => {
    return (
        <MasterLayout>
            <div className="container">
                <BlogPostComponent/>
            </div>
        </MasterLayout>
    );
};

export default BlogPage;