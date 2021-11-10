import { useState } from "react"

export function EncryptionDemo(props) {
    const [publicKey, setPublicKey] = useState("")
    const [privateKey, setPrivateKey] = useState("")

    return (
        <>
            <div>Server Public Key: {publicKey}</div>
            <div>Message Decrypted: {privateKey}</div>
        </>
    )
}
