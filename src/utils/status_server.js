import { getJson } from "./API"

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
            resolve(infoServer.public_key)
        } else {
            updateInfoServer()
                .then(() => resolve(infoServer.public_key))
                .catch((err) => reject(err))
        }
    })
}

function getServerStatus() {
   return updateInfoServer()
}

export { getPublicKey, getServerStatus }
