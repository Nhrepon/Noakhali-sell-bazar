import axios from "axios";
import { create } from "zustand";
import { getEmail, setEmail, unauthorized } from "../utility/Utility";
import Cookies from "js-cookie";

const UserStore = create((set) => ({
  isLogin: () => {
    //Cookies.set('token','this is my cookie')
    const cookie = !!Cookies.get("token");
    //return !!Cookies.get("token");
    console.log(cookie);
    return cookie;
  },

  loginFormValue: { email: "" },

  loginFormOnChange: (name, value) => {
    set((state) => ({
      loginFormValue: {
        ...state.loginFormValue,
        [name]: value,
      },
    }));
  },

  ProfileForm: {userName: "", userMobile: "", userAddress: "", userCity: "",userState: "",userPostCode: "",userCountry: "",shippingAddress: "",shippingCity: "",shippingState: "",shippingPostCode: "",shippingCountry: "",},

  ProfileFormOnChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },

  ProfileDetails: null,
  getProfileDetails: async () => {
    try {
      const res = await axios.get(`/api/userProfileRead`);
      if (res.data["status"]==="success" || res.data["data"].length > 0) {
        set({ ProfileDetails: res.data["data"] });
        set({ ProfileForm: res.data["data"]});

      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  ProfileSave: async (PostBody) => {
    try {
      set({ ProfileDetails: null });
      let res = await axios.post(`/api/userProfileUpdate`, PostBody);
      return res.data["status"] === "success";
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  userLogout: async () => {
    set({ isFormSubmit: true });
    const response = await axios.get("/api/userLogout");
    set({ isFormSubmit: false });
    return response.data["status"] === "success";
  },

  otpFormData: { otp: "" },

  otpFormOnChange: (name, value) => {
    set((state) => ({
      otpFormData: {
        ...state.otpFormData,
        [name]: value,
      },
    }));
  },

  isFormSubmit: false,

  userOtp: async (email) => {
    set({ isFormSubmit: true });
    const response = await axios.get("/api/userOtp/" + email);
    setEmail(email);
    set({ isFormSubmit: false });
    return response.data["status"] === "success";
  },

  verifyLogin: async (otp) => {
    set({ isFormSubmit: true });
    const email = getEmail();
    const response = await axios.get("/api/verifyLogin/" + email + "/" + otp);
    set({ isFormSubmit: false });
    return response.data["status"] === "success";
  },
}));

export default UserStore;
