import axiosConfig from "../config/axioConfig";

export async function create(icon,label,categorie) {
  const data = new FormData();
  data.append("icon", icon[0]);
  data.append("label", label);
  data.append("souscategorie", categorie);
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/sousSousCategorie", data, headers)
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

export async function updateById(id,icon,label,iconUpadte,idcategorie) {
  const categorie = new FormData();
  categorie.append("icon", icon[0]);
  categorie.append("label", label);
  categorie.append("iconUpadte", iconUpadte);
  categorie.append("souscategorie", idcategorie);
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .put("/sousSousCategorie/"+id,categorie, headers)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res.data);
      })
      .catch((error) => {
       
        reject(error);
      });
  });
}
