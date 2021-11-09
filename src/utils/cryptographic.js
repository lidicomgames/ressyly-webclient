import aesjs from "aes-js";

function randomKey() {
   let result = [];

   for (let i = 0; i < 16; i++) {
      result.push(Math.floor(Math.random() * 255));
   }

   return result;
}

export function generateNewAes() {
   let key = randomKey();
   let iv = randomKey();
   return [new aesjs.ModeOfOperation.cbc(key, iv), key, iv];
}
