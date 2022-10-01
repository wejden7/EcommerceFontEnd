import axiosConfig from "../config/axioConfig";

export async function create(label,logo,logoName,onUploadProgress) {
    const data = new FormData();
    data.append("logo", logo);
    data.append("label", label);
    data.append("logoName", logoName);

 
  const config = {
    onUploadProgress: onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/marque", data,config)
      .then(async (res) => {
        resolve(res);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}

export async function getAll(){
    const headers = {
       "Content-Type": "multipart/form-data",
      };
    
      return new Promise(async (resolve, reject) => {
        await axiosConfig
          .get("/marque", headers)
          .then(async (res) => {
            resolve(res);
          })
          .catch((error) => {
           
            reject(error);
          });
      });


}

export async function deleteById (id){
    const headers = {
       "Content-Type": "multipart/form-data",
      };
    
      return new Promise(async (resolve, reject) => {
        await axiosConfig
          .delete("/marque/"+id, headers)
          .then(async (res) => {
            resolve(res);
          })
          .catch((error) => {
           
            reject(error);
          });
      });
}

export async function updateById (id,label,logo,logoName,logoNameExist){
    const data = new FormData();
    data.append("logo", logo);
    data.append("label", label);
    data.append("logoName", logoName);
    data.append("logoNameExist", logoNameExist);
    const headers = {
       "Content-Type": "multipart/form-data",
      };
    
      return new Promise(async (resolve, reject) => {
        await axiosConfig
          .put("/marque/"+id, data, headers)
          .then(async (res) => {
            resolve(res);
          })
          .catch((error) => {
           
            reject(error);
          });
      });
}