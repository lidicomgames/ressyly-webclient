import { useEffect, useState } from "react"
import { generateNewAes } from "../utils/cryptographic"
import { getPublicKey } from "../utils/status_server"
import aesjs from "aes-js"
import { encrypt } from "eciesjs"
import { getJson } from "../utils/API"

export function EncryptionDemo(props) {
    const [publicKey, setPublicKey] = useState("")
    const [privateKey, setPrivateKey] = useState("")

    useEffect(() => {
        getPublicKey().then((pkey) => {
            setPublicKey(pkey)

            let [aes, key, iv] = generateNewAes()
            let pkeyEncrypted = aesjs.utils.hex.fromBytes(encrypt(pkey, key.concat(iv)))

            getJson(`/getPrivateKey/yeferson/${pkeyEncrypted}`).then((data) => {
                let message = aes.decrypt(aesjs.utils.hex.toBytes(data.private_key)).slice(0, 32)
                let messageDecrypted = aesjs.utils.hex.fromBytes(message)
                setPrivateKey(messageDecrypted)
            })
        })
    }, [])

    return (
        <>
            <div>Server Public Key: {publicKey}</div>
            <div>Message Decrypted: {privateKey}</div>
        </>
    )
}
