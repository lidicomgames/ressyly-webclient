import aesjs from "aes-js";

const URL_API = "http://127.0.0.1:8080/api/info";
var infoServer = undefined;

function getJson(url) {
   return new Promise((resolve, reject) => {
      fetch(url)
         .then((response) => response.json())
         .then((data) => resolve(data))
         .catch((err) => reject(err));
   });
}

function updateInfoServer() {
   return new Promise((resolve, reject) => {
      getJson(URL_API + "infoState")
         .then((data) => {
            infoServer = data;
            resolve();
         })
         .catch((err) => reject(err));
   });
}

function getPrivKey() {
   return new Promise((resolve, reject) => {
      if (infoServer) {
         resolve(infoServer.priv_key);
      } else {
         updateInfoServer()
            .then(() => resolve(infoServer.priv_key))
            .catch((err) => reject(err));
      }
   });
}
