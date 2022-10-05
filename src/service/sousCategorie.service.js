import axiosConfig from "../config/axioConfig";

export async function create(label,icon,categorie,onUploadProgress) {
  const data = new FormData();
  data.append("icon", icon[0]);
  data.append("label", label);
  data.append("categorie", categorie);
  const config = {
    onUploadProgress: onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/sousCategorie", data, config)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}

export async function getAll() {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .get("/sousCategorie", headers)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res.data);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}

export async function getById() {}

export async function deleteById(id) {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .delete("/sousCategorie/"+id, headers)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res.data);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}

export async function updateById(label, icon,categorie_id ,id, iconExiste,onUploadProgress) {
  const categorie = new FormData();
  categorie.append("icon", icon[0]);
  categorie.append("label", label);
  categorie.append("iconUpadte", iconExiste);
  categorie.append("categorie", categorie_id);
  const config = {
    onUploadProgress: onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .put("/sousCategorie/"+id,categorie, config)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res.data);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}
