import axiosConfig from "../config/axioConfig";

export async function create(initialProduit) {
 
    const data = new FormData();
    data.append("name", initialProduit.name);
    data.append("prix", initialProduit.prix);
    data.append("quantity",initialProduit. quantity);
    data.append("tva", initialProduit.tva);
    data.append("categorie", initialProduit.categorie);
    data.append("marque", initialProduit.marque);
    data.append("forniseur", initialProduit.forniseur);
    data.append("image",initialProduit.image);
    
 

  const config = {
    onUploadProgress: null,
    headers: {
      'Content-Type': 'Application/json',
    },
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/produit", data,config)
      .then(async (res) => {
        console.log(res.data.data)
        resolve(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data)
       
        reject(error.response.data);
      });
  });
}

export async function getAll() {


const config = {

  headers: {
    "Content-Type": "multipart/form-data",
  },
};

return new Promise(async (resolve, reject) => {
  await axiosConfig
    .get("/produit",config)
    .then(async (res) => {
      resolve(res.data.result);
    })
    .catch((error) => {
     
      reject(error);
    });
});
}
export async function deleteById(id) {


  const config = {
  
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .delete("/produit/"+id,config)
      .then(async (res) => {
        resolve(res);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}

export async function update(initialProduit) {

 

  console.log(initialProduit)

    const config = {
      
      onUploadProgress: null,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data:initialProduit
    };
    
    return new Promise(async (resolve, reject) => {
      await axiosConfig
        .put("/produit/"+initialProduit.id,config)
        .then(async (res) => {
          console.log(res)
          resolve(res.data.data);
        })
        .catch((error) => {
         
          reject(error);
        });
    });
}

export async function uplodeImageById(initialProduit) {
 
  const data = new FormData();
  
  data.append("id",initialProduit.id);
  for (let i = 0; i < initialProduit.images.length; i++) {
  data.append("images",initialProduit.images[i]);
  }
  


const config = {
  onUploadProgress: null,
  headers: {
    'Content-Type': 'Application/json',
  },
};
return new Promise(async (resolve, reject) => {
  await axiosConfig
    .post("/image", data,config)
    .then(async (res) => {
      console.log(res.data.data)
      resolve(res.data.data);
    })
    .catch((error) => {
      console.log(error.response.data)
     
      reject(error.response.data);
    });
});
}
export async function addNewDiscription(initialProduit) {
 
 


const config = {
  onUploadProgress: null,
  headers: {
    'Content-Type': 'Application/json',
  },
};
return new Promise(async (resolve, reject) => {
  await axiosConfig
    .post("/description", initialProduit,config)
    .then(async (res) => {
      console.log(res.data.data)
      resolve(res.data.data);
    })
    .catch((error) => {
      console.log(error.response.data)
     
      reject(error.response.data);
    });
});
}
export async function updateDiscription(initialProduit) {
 
  const config = {
    onUploadProgress: null,
    headers: {
      'Content-Type': 'Application/json',
    },
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .put("/description", initialProduit,config)
      .then(async (res) => {
        console.log(res.data.data)
        resolve(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data)
       
        reject(error.response.data);
      });
  });
  }
  export async function deleteDiscription(initialProduit) {
 //{id_produit,id_description}
    const config = {
      onUploadProgress: null,
      headers: {
        'Content-Type': 'Application/json',
      },
      data:initialProduit
    };
    console.log(initialProduit)
    return new Promise(async (resolve, reject) => {
      await axiosConfig
        .delete("/description",config)
        .then(async (res) => {
          console.log(res.data.data)
          resolve(res.data.data);
        })
        .catch((error) => {
          console.log(error.response.data)
         
          reject(error.response.data);
        });
    });
    }
    export async function deleteImage(initialProduit) {
      //{id_produit,id_image}
         const config = {
           onUploadProgress: null,
           headers: {
             'Content-Type': 'Application/json',
           },
           data:initialProduit
         };
         console.log(initialProduit)
         return new Promise(async (resolve, reject) => {
           await axiosConfig
             .delete("/image",config)
             .then(async (res) => {
               console.log(res.data.data)
               resolve(res.data.data);
             })
             .catch((error) => {
               console.log(error.response.data)
              
               reject(error.response.data);
             });
         });
         }