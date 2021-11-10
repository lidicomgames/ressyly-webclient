import "./App.css"

import { EncryptionDemo } from "./pages/encryptiondemo"
import { useStatusServer } from "./utils/status_server"

function App() {
    const serverStatus = useStatusServer()

    return (
        <>
            <div>{serverStatus.status}</div>
            <br />

            {serverStatus.status === "online" && (
                <div>
                    <EncryptionDemo />
                </div>
            )}
        </>
    )
}

export default App
