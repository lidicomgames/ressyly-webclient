import { useEffect, useState } from "react";
import { generateNewAes } from "../utils/cryptographic";
import { getPublicKey } from "../utils/status_server";
import aesjs from "aes-js";
import { encrypt } from "eciesjs";

export function EncryptionDemo(props) {
   const [publicKey, setPublicKey] = useState("");
   const [aesKey, setAesKey] = useState("");
   const [ivKey, setIvKey] = useState("");
   const [message, setMessage] = useState("");
   const [pkeyMessage, setPkeyMessage] = useState("");

   useEffect(() => {
      getPublicKey().then((pkey) => {
         setPublicKey(pkey);
         let [aes, key, iv] = generateNewAes();

         let pkeyEncrypted = encrypt(pkey, key.concat(iv));

         setAesKey(aesjs.utils.hex.fromBytes(key));
         setIvKey(aesjs.utils.hex.fromBytes(iv));

         setPkeyMessage(aesjs.utils.hex.fromBytes(pkeyEncrypted));
         setMessage(aesjs.utils.hex.fromBytes(key.concat(iv)));
      });
   }, []);

   return (
      <>
         <div>Server Public Key: {publicKey}</div>
         <div>AES Key: {aesKey}</div>
         <div>IV Key: {ivKey}</div>
         <div>Message: {message}</div>
         <div>Message Encrypted: {pkeyMessage}</div>
      </>
   );
}
