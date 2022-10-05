import axiosConfig from "../config/axioConfig";

export async function create(label, icon,onUploadProgress) {
  const categorie = new FormData();
  categorie.append("icon", icon[0]);
  categorie.append("label", label);
  const config = {
    onUploadProgress: onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .post("/categorie", categorie, config)
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

export async function updateById(label, icon ,id,iconUpadte,onUploadProgress) {
  console.log(id)
  const categorie = new FormData();
  categorie.append("icon", icon[0]);
  categorie.append("label", label);
  categorie.append("iconUpadte", iconUpadte);
  const config = {
    onUploadProgress: onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return new Promise(async (resolve, reject) => {
    await axiosConfig
      .put("/categorie/"+id, categorie, config)
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