import axiosConfig from "../config/axioConfig";

export async function create(name,email,tel,adresse) {

  const data = {
    name:name,
    email:email,
    tel:tel,
    adresse:adresse
  }

  const headers = {
    'Content-Type': 'Application/json',
  };

  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/forniseur",data ,headers)
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
        'Content-Type': 'Application/json',
      };
    
      return new Promise(async (resolve, reject) => {
        await axiosConfig
          .get("/forniseur", headers)
          .then(async (res) => {
            resolve(res.data.data);
          })
          .catch((error) => {
            resolve([]);
            reject(error);
          });
      });


}

export async function deleteById (id){
    const headers = {
        'Content-Type': 'Application/json',
      };
    
      return new Promise(async (resolve, reject) => {
        await axiosConfig
          .delete("/forniseur/"+id, headers)
          .then(async (res) => {
            resolve(res);
          })
          .catch((error) => {
           
            reject(error);
          });
      });
}
export async function deleteByArrayId (forniseurs){
  const data = {
    forniseur:forniseurs
  }
  const headers = {
      'Content-Type': 'Application/json',
    };
  
    return new Promise(async (resolve, reject) => {
      await axiosConfig
        .post("/deleteforniseur",data, headers)
        .then(async (res) => {
          resolve(res);
        })
        .catch((error) => {
         
          reject(error);
        });
    });
}
export async function updateById (id,name,email,tel,adresse){
    const data = {
        name:name,
        email:email,
        tel:tel,
        adresse:adresse
      }
    const headers = {
        'Content-Type': 'Application/json',
      };
    
      return new Promise(async (resolve, reject) => {
        await axiosConfig
          .put("/forniseur/"+id, data, headers)
          .then(async (res) => {
            resolve(res);
          })
          .catch((error) => {
           
            reject(error);
          });
      });
}