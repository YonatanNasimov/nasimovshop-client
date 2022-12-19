import axios from "axios";

export const server_url = "https://calm-puce-angler-slip.cyclic.app";

export const TOKEN_NAME = "nasimovToken";

export const doApiGet = async(_url) => {
    try{
      let resp = await axios.get(_url,{
        headers:{
          "x-api-key": localStorage[TOKEN_NAME]
        }
      })
      return resp;
    }
    catch(err){
      // throw-> בבקשות של פרומיס מזהים את זה בתור החזרת שגיאה
      throw err;
    }
  }

  export const publicRequest = axios.create({
    baseURL: server_url,
  });

  export const userRequest = axios.create({
    baseURL: server_url,
    headers:{
      "x-api-key": localStorage[TOKEN_NAME]
    },
  });
  
  
  // For Post,delete, put, patch
  export const doApiMethod = async(_url,_method,_body = {}) => {
    try{
      console.log(_body)
      let resp = await axios({
        url:_url,
        method:_method,
        data:_body,
        headers:{
          "x-api-key":localStorage[TOKEN_NAME]
        }
      })
      return resp;
    }
    catch(err){
      throw err;
    }
  }