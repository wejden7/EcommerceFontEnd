import axiosConfig from "../config/axioConfig";

export async function create(label ,icon,categorie,onUploadProgress) {

  const data = new FormData();
  data.append("icon", icon[0]);
  data.append("label", label);
  data.append("souscategorie", categorie);
   const config = {
    onUploadProgress: onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/sousSousCategorie", data, config)
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
      .get("/sousSousCategorie", headers)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res.data.categories);
      })
      .catch((error) => {
        resolve([]);
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
      .delete("/sousSousCategorie/"+id, headers)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res.data);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}

export async function updateById(label,icon,categorie,id,iconUpadte,onUploadProgress) {
  const data = new FormData();
  data.append("icon", icon[0]);
  data.append("label", label);
  data.append("iconUpadte", iconUpadte);
  data.append("souscategorie", categorie);
  const config = {
    onUploadProgress: onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .put("/sousSousCategorie/"+id,data, config)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res.data);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}
