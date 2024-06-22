import React, { useEffect } from "react";
import UserStore from "../../store/UserStore";
import LoaderComponent from "../../loaders/LoaderComponent";
import toast from "react-hot-toast";

const ProfileForm = () => {
    const {ProfileForm, ProfileFormOnChange, ProfileDetails, getProfileDetails, ProfileSave}=UserStore();
    
    useEffect(() => {
        (async () => {
          await getProfileDetails();
        })();
      }, []);

      const saveProfile = async ()=>{
        const response = await ProfileSave(ProfileForm);
        if(response){
            toast.success("Profile Updated");
            //window.location.reload();
            await getProfileDetails();
        }
      }


      if(ProfileDetails===null){
        return (<LoaderComponent/>)
      }else{

    return (
    <>
      <div className="container mt-5">
        <div className="card p-5 rounded-3">
          <h6>Customer Details</h6>
          <hr />
          <div className="row mb-4">
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Name </label>
              <input value={ProfileForm.userName} onChange={(e)=>{ProfileFormOnChange("userName",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Phone </label>
              <input value={ProfileForm.userMobile} onChange={(e)=>{ProfileFormOnChange("userMobile",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Country </label>
              <input value={ProfileForm.userCountry} onChange={(e)=>{ProfileFormOnChange("userCountry",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer City </label>
              <input value={ProfileForm.userCity} onChange={(e)=>{ProfileFormOnChange("userCity",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer State </label>
              <input value={ProfileForm.userState} onChange={(e)=>{ProfileFormOnChange("userState",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Post Code </label>
              <input value={ProfileForm.userPostCode} onChange={(e)=>{ProfileFormOnChange("userPostCode",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Address</label>
              <input value={ProfileForm.userAddress} onChange={(e)=>{ProfileFormOnChange("userAddress",e.target.value)}} type="text" className="form-control " />
            </div>
          </div>
          <h6>Shipping Details</h6>
          <hr />
          <div className="row">
            
            <div className="col-md-4 p-2">
              <label className="form-label">Shipping Country </label>
              <input value={ProfileForm.shippingCountry} onChange={(e)=>{ProfileFormOnChange("shippingCountry",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label">Shipping City </label>
              <input value={ProfileForm.shippingCity} onChange={(e)=>{ProfileFormOnChange("shippingCity",e.target.value)}} type="text" className="form-control " autoComplete="on" />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label">Shipping State </label>
              <input value={ProfileForm.shippingState} onChange={(e)=>{ProfileFormOnChange("shippingState",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label">Shipping Post Code </label>
              <input value={ProfileForm.shippingPostCode} onChange={(e)=>{ProfileFormOnChange("shippingPostCode",e.target.value)}} type="text" className="form-control " />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label">Shipping Address</label>
              <input value={ProfileForm.shippingAddress} onChange={(e)=>{ProfileFormOnChange("shippingAddress",e.target.value)}} type="text" className="form-control " />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-3 p-2">
              <button onClick={saveProfile} className="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



};

export default ProfileForm;
