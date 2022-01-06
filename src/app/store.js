import { configureStore } from "@reduxjs/toolkit"
import serverInfoReduce from "../features/server/serverInfoSlice"

const store = configureStore({
  reducer: {
    serverInfo: serverInfoReduce
  }
})

export default store
