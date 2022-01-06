import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectInfoServer, fetchInfoServer } from "./features/server/serverInfoSlice"

function App() {
  const infoServer = useSelector(selectInfoServer)
  const dispach = useDispatch()

  useEffect(() => {
    dispach(fetchInfoServer())
  }, [])
  return (
    <>
      <div>Rylly App</div>
      <div>Server status: {infoServer?.status}</div>
      <div>Server public key: {infoServer?.publicKey}</div>
    </>
  )
}

export default App
