import "./App.css";
import { useState, useEffect } from "react";
import { getServerStatus } from "./utils/status_server";

import { EncryptionDemo } from "./pages/encryptiondemo";

function App() {
   const [serverOnline, setServerOnline] = useState("loading");

   useEffect(() => {
      getServerStatus()
         .then(() => setServerOnline("online"))
         .catch(() => setServerOnline("offline"));
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
