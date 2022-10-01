import axiosConfig from "../config/axioConfig";

export async function create(name,prix,quantity,tva,categorie,marque,forniseur,description,images,onUploadProgress) {
  console.log("true 1")

    const data = new FormData();
    data.append("name", name);
    data.append("prix", prix);
    data.append("quantity", quantity);
    data.append("tva", tva);
    data.append("categorie", categorie);
    data.append("marque", marque);
    data.append("forniseur", forniseur);
    
    data.append("description", JSON.stringify(description));
 console.log("true 3")
    
    for (let i = 0; i < images.length; i++) {
        data.append('images',images[i])
      }

  const config = {
    onUploadProgress: onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
 console.log("true 2")
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/produit", data,config)
      .then(async (res) => {
        resolve(res);
      })
      .catch((error) => {
       
        reject(error);
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
      resolve(res);
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