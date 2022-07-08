import axios from 'axios';
import jwt_decode from 'jwt-decode';


let token = localStorage?.getItem("auth");
let baseHelper = "http://localhost:5000"

function checkToken(){
    if(token){
        let date = new Date();
        let time = date.getTime();
        let exp =jwt_decode(token)?.exp;

        if(time>exp){
            // localStorage.setItem("auth","");
            // window.location.replace("/unauthorized");
            
            return false;
        }

        return true;
    }


    // window.location.replace("/login")
    return false;
    
}

export async function callGetAPI(url) {
    try {
        checkToken();

        let res = await axios.get(baseHelper + url, {
            headers: {
                Authorization: `${token}`,
            },
        })
        let data
        if (res?.data?.body) {
            data = await res.data.body;
        } else {
            data = await res.data.data;
        }
        return data;
        
    } catch (err) {
      
        console.log(err);
        return -1;
    }
}

export async function callPostAPI(url, data, obj = "application/json") {
    try {
        checkToken();
        let res = await axios.post(baseHelper + url, data, {
            headers: {
                Authorization: `${token}`,
                "content-type": obj,
            },
        })
      
        return res;
    } catch (err) {
      
        console.log(err);
        return -1;
    }
}

export async function callDeleteAPI(url) {
    try {
        checkToken();
        return await axios.delete(baseHelper + url, {
            headers: {
                Authorization: `${token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }

}


export default {
    callGetAPI,
    callDeleteAPI,
    callPostAPI
};