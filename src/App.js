import "./App.css"
import { useState, useEffect } from "react"
import { getServerStatus } from "./utils/status_server"

import { encrypt, decrypt, PrivateKey } from "eciesjs"

const publicKey = "02ae26f23199bd3a2916f91b9ac9fd12da3ad3392d229bb16c525eb51fd89b7a0a"
const message = encrypt(publicKey, "1234").toString("hex")
console.log(message)

function App() {
    const [serverOnline, setServerOnline] = useState("loading")

    useEffect(() => {
        getServerStatus()
            .then(() => setServerOnline("online"))
            .catch(() => setServerOnline("offline"))
    }, [])

    return (
        <>
            <div>{serverOnline}</div>
        </>
    )
}

export default App
