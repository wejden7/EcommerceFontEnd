import axiosConfig from "../config/axioConfig";
export async function login(email, password) {
const   user={
    "email":email,
    "password": password
  }
  const headers = { 
    'Content-Type': 'multipart/form-data'
};
  return new Promise(async(resolve, reject) => {
   await axiosConfig.post("/login", user ,headers)
      .then(async res => {
       
        resolve(res.data.token)
      }).catch((error)=>{
      
        reject(error.message)
      })
   })
  
} 
