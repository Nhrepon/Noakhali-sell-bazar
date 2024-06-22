import create from 'zustand';
import axios from 'axios'


const FeatureStore=create((set)=>({
    featureList: null,
    getFeatureList: async ()=>{
        const response=await axios.get('/api/featureList');
        if(response.data['status']==="success"){
            set({ featureList: response.data['data']});
        }
    },


    legalDetails:null,
    getLegalDetails:async(type)=>{
        const response=await axios.get('/api/legalDetails/'+type);
        if(response.data['status']==="success"){
            set({ legalDetails: response.data['data']});
        }
    }






}));

export default FeatureStore;