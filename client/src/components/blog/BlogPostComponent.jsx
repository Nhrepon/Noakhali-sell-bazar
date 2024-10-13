import React, { useEffect } from 'react';
import BlogPostStore from '../../store/BlogPostStore';
import { Link } from 'react-router-dom';


const BlogPostComponent = () => {

    const {blogPostList, getBlogPostList} = BlogPostStore();


    useEffect(()=>{
        (async()=>{
            await getBlogPostList();
        })()
    },[]);


    return (
        <div className="row my-2 gy-4">
            <div className="col-12">
                <h2 className="text-center my-3">Blog Posts</h2>
                <hr />
            </div>
            {
                blogPostList != null && blogPostList.map((item, i)=>{
                    return (
                        <div className="col-sm-3">
                            <div className="card" key={i}>
                                <img className="card-img-top p-2" src={item["thumbnail"]} alt={item["title"]}/>
                                <div className="card-body">
                                    <div className="my-2 d-flex justify-content-between ">
                                        <span>Posted By: <Link className='text-dark fw-bold' to={`/profile/${item["user"]._id}`}>{item["user"].userName}</Link></span>
                                        <span>On: <Link className='text-dark fw-bold' to={`/blog/${item["_id"]}`}>{item["tags"]}</Link></span>
                                    </div>
                                    <h3 className="card-title fs-5">
                                        <Link className='text-dark fw-bold' to={`/blog/${item["_id"]}`}>{item["title"]}</Link>
                                    </h3>
                                    <p className="card-text">{item["content"]}</p>
                                </div>
                            </div>
                        </div>
                    )
                    })
            }
        </div>
    );
};

export default BlogPostComponent;