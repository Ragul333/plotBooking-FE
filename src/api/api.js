import axios from "axios";
import { BACKEND_URL } from "../constants";

export const uploadSite = async (propsData) => {
    try {
       const resp = await axios.post(`${BACKEND_URL}/api/site/createSite`,propsData);
       return resp.data; 
    } catch (error) {
        console.log(error); 
    }
}

export const getSites = async () => {
    try {
        const data = await axios.get(`${BACKEND_URL}/api/site`);
        console.log(data); 
    } catch (error) {
        console.log(error); 
    }
}