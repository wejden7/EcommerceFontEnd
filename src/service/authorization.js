import axiosConfig from "../config/axioConfig";
export async function Admin() {
   // const { token } =
   // UseStateContext();
    var token = localStorage.getItem("token")
  const headersdata = { 
    'Access-Control-Allow-Origin':"*",
    'Content-Type': 'Application/json',
    'Authorization':  `${token}`
};
 return new Promise(async(resolve ,reject)=>{
  await axiosConfig.get("/admin",{headers:headersdata})
  .then( res => {
    resolve(res.data.success) 
    
  }).catch((error)=>{
     reject()
  })

 })
  
  
  
} 