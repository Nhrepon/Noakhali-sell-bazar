import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartStore from '../../store/CartStore';
import ReviewStore from '../../store/ReviewStore';
import LoaderComponent from '../../loaders/LoaderComponent';
import ReviewSubmitButton from './ReviewSubmitButton';
import ValidationHelper from '../../utility/ValidationHelper';
import { toast } from 'react-hot-toast';
import {Modal} from "react-bootstrap";



const InvoiceDetails = () => {
    const navigate =useNavigate();
    const [show, setShow]=useState(false);
    const handleClose=()=>setShow(false);

    const {reviewFormData, reviewFromOnChange, saveReview}=ReviewStore();
   
    const reviewModal=(id)=>{
        setShow(true);
        reviewFromOnChange('productId', id);
    }
    const {id}=useParams();
    const {invoiceDetails, getInvoiceDetails}=CartStore();
    

    useEffect(() => {
        (async () => {
            await getInvoiceDetails(id);
        })()
    }, [id]);

    const submitReview=async()=>{
        if (ValidationHelper.IsEmpty(reviewFormData.description)) {
            toast.error("Review description is required");
        }else{
            const response = await saveReview(reviewFormData);
            if (response) {
                toast.success("Review Added");
                navigate(`/details/${reviewFormData.productId}`);
            }else{
                toast.error("Something went wrong");
            }
            setShow(false);
        }
    }




    if (invoiceDetails == null) {
        return(<LoaderComponent/>);
    }else if (invoiceDetails.length == 0) {
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col-12  text-center my-5 p-5">
                        <h1 className="headline-1">Opps!</h1>
                        <h3 className="headline-3">Your Invoice is Empty</h3>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush">
                                {
                                    invoiceDetails.map((item,i)=>{
                                        return(<li className="list-group-item d-flex justify-content-between align-items-start">
                                                <img className="rounded-1" alt="" width="90" height="auto" src={item['product']['image']}/>
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-medium h6">
                                                        {item['product']['title']}
                                                    </div>
                                                    <span>Unit Price: {item['price']}, Total: {parseFloat(item['price'])*parseFloat(item['quantity'])}</span><br/>
                                                    <span>Qty: {item['quantity']}, Size: {item['size']}, Color: {item['color']}</span>
                                                </div>
                                                <button onClick={()=>reviewModal(item['productId'])} className="btn btn-success">Create Review</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h6>Create Review</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 p-2">
                                    <label className="form-label">Rating</label>
                                    <select onChange={(e)=>reviewFromOnChange('rating',e.target.value)} className="form-select">
                                        <option value="5">5 Star</option>
                                        <option value="4">4 Star</option>
                                        <option value="3">3 Star</option>
                                        <option value="2">2 Star</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <div className="col-12 p-2">
                                    <label className="form-label">Review</label>
                                    <textarea onChange={(e)=>reviewFromOnChange('description',e.target.value)} className="form-control" rows={7}/>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-dark" onClick={handleClose}>Close</button>
                        <ReviewSubmitButton text="Submit" className="btn btn-success" onClick={submitReview}/>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

};

export default InvoiceDetails;