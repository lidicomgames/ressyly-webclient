import aesjs from "aes-js"
import { getJson, URL_API } from "./API"

var infoServer = undefined

function updateInfoServer() {
    return new Promise((resolve, reject) => {
        getJson("/info")
            .then((data) => {
                infoServer = data
                resolve()
            })
            .catch((err) => reject(err))
    })
}

function getPublicKey() {
    return new Promise((resolve, reject) => {
        if (infoServer) {
            resolve(infoServer.publicKey)
        } else {
            updateInfoServer()
                .then(() => resolve(infoServer.publicKey))
                .catch((err) => reject(err))
        }
    })
}

function getServerStatus() {
   return updateInfoServer()
}

export { getPublicKey as getPrivKey, getServerStatus }
