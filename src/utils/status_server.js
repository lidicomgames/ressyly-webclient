import aesjs from "aes-js";
import { encrypt } from "eciesjs";
import { getJson } from "./API";
import { generateNewAes } from "./cryptographic";
import { containsPrivateKey, setUserVars } from "./user_actions";

var infoServer = {
   public_key: "",
   status: "loading",
   last_update: 0,
};

async function updateInfoServer() {
   infoServer.public_key = "";
   infoServer.status = "loading";

   return new Promise((resolve, reject) => {
      getJson("/info")
         .then((data) => {
            infoServer.public_key = data.public_key;
            infoServer.status = data.status;
            infoServer.last_update = Date.now();

            if (!containsPrivateKey()) {
               let pkey = infoServer.public_key;
               let { aes, key, iv } = generateNewAes();
               let pkeyEncrypted = aesjs.utils.hex.fromBytes(encrypt(pkey, key.concat(iv)));

               getJson(`/getPrivateKey/yeferson/${pkeyEncrypted}`)
                  .then((data) => {
                     let msg_bytes = aesjs.utils.hex.toBytes(data.private_key);
                     let msg_bytes_decrypted = aes.decrypt(msg_bytes).slice(0, 32);
                     setUserVars(msg_bytes_decrypted);
                  })
                  .catch((err) => {
                     reject(err);
                  });
            } else {
               resolve();
            }
         })
         .catch((err) => reject(err));
   });
}
