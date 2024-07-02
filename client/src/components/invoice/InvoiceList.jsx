import React, { useEffect } from 'react';
import CartStore from '../../store/CartStore';
import LoaderComponent from '../../loaders/LoaderComponent';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
    const {invoiceList, getInvoiceList}=CartStore();

    useEffect(() => {
        (async()=>{
            await getInvoiceList();
        })()
    }, []);



    if (invoiceList==null ) {
        return (<LoaderComponent/>)
    }else if (invoiceList.length===0) {
        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-12  text-center my-5 p-5">
                        <h1 className="headline-1">Opps!</h1>
                        <h3 className="headline-3">Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush">
                                {
                                    invoiceList.map((item,i)=>{
                                        return(<li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 my-5 me-auto">
                                                    <div className="">
                                                        <p className="m-1"><b>Invoice No::</b> {item['transactionId']}</p>
                                                        <p className="m-1"><b>Customer:</b> {item['customerDetails']}</p>
                                                        <p className="m-1"><b>Shipping: </b>{item['shippingDetails']}</p>
                                                        <p className="m-1"><b>Payment: </b>{item['paymentStatus']}</p>
                                                        <p className="m-1"><b>Delivery: </b> {item['deliveryStatus']}</p>
                                                        <p className="m-1"><b>Total amount: </b> {item['total']}</p>
                                                        <p className="m-1"><b>Vat 0.5%: </b> {item['vat']}</p>
                                                        <p className="m-1"><b>Total payable: </b> {item['payable']}</p>
                                                    </div>
                                                </div>
                                                <Link className="btn btn-success" to={`/invoice/${item['_id']}`}>Details</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


};

export default InvoiceList;