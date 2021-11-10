import "./App.css";
import { useState, useEffect } from "react";

import { EncryptionDemo } from "./pages/encryptiondemo";
import { updateInfoServer } from "./utils/status_server"

function App() {
   const [serverOnline, setServerOnline] = useState("loading");

   useEffect(() => {
   }, []);

   return (
      <>
         <div>{serverOnline}</div>
         <br />

         {serverOnline === "online" && (
            <div>
               <EncryptionDemo />
            </div>
         )}
      </>
   );
}

export default App;
