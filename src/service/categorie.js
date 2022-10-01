import axiosConfig from "../config/axioConfig";

export async function create(label, icon, iconName) {
  const categorie = new FormData();
  categorie.append("icon", icon);
  categorie.append("label", label);
  categorie.append("iconName", iconName);
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/categorie", categorie, headers)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res.data.token);
      })
      .catch((error) => {
        console.log(error.response.data);
        reject(error.response.data);
      });
  });
}

export async function getAll() {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .get("/categorie", headers)
      .then(async (res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        reject(error);
      });
  });
}

export async function deleteById(id) {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .delete("/categorie/" + id, headers)
      .then(async (res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        reject(error.message);
      });
  });
}

export async function updateById(label, icon, iconName ,id,iconUpadte) {
  const categorie = new FormData();
  categorie.append("icon", icon);
  categorie.append("label", label);
  categorie.append("iconName", iconName);
  categorie.append("iconUpadte", iconUpadte);
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .put("/categorie/"+id, categorie, headers)
      .then(async (res) => {
        console.log("sucsses");
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error.message);
      });
  });
}