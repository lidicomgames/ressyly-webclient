import aesjs from "aes-js"
import { encrypt } from "eciesjs"
import { Component } from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getJson } from "./API"
import { generateNewAes } from "./cryptographic"
import { containsPrivateKey, setUserVars } from "./user_actions"

var infoServer = {
    public_key: "",
    status: "loading",
    last_update: 0,
}

function updateInfoServer() {
    infoServer.public_key = ""
    infoServer.status = "loading"

    return new Promise((resolve, reject) => {
        getJson("/info")
            .then((data) => {
                infoServer.public_key = data.public_key
                infoServer.status = data.status || "online"
                infoServer.last_update = Date.now()

                if (!containsPrivateKey()) {
                    let pkey = infoServer.public_key
                    let { aes, key, iv } = generateNewAes()
                    let pkeyEncrypted = aesjs.utils.hex.fromBytes(encrypt(pkey, key.concat(iv)))

                    getJson(`/getPrivateKey/yeferson/${pkeyEncrypted}`)
                        .then((data) => {
                            let msg_bytes = aesjs.utils.hex.toBytes(data.private_key)
                            let msg_bytes_decrypted = aes.decrypt(msg_bytes).slice(0, 32)
                            setUserVars(msg_bytes_decrypted)
                            resolve(infoServer)
                        })
                        .catch((err) => {
                            reject(err)
                        })
                } else {
                    resolve(infoServer)
                }
            })
            .catch((err) => reject(err))
    })
}

export const StatusServerContext = createContext(infoServer)
export const useStatusServer = () => useContext(StatusServerContext)

export class StatusServer extends Component {
    constructor() {
        super()
        this.state = infoServer
    }

    componentDidMount() {
        updateInfoServer()
            .then((data) => {
                this.setState(data)
            })
            .catch((err) => console.error(err.message))
    }

    render() {
        return (
            <StatusServerContext.Provider value={this.state}>
                {this.props.children}
            </StatusServerContext.Provider>
        )
    }
}
