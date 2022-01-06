import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getInfoServer } from "../../api/client"

export const fetchInfoServer =
  createAsyncThunk("serverInfo/fetchInfoServer", async () => {
    const result = await getInfoServer()
    return result.publicKey
  })

export const serverInforSlice = createSlice({
  name: "serverInfo",
  initialState: {
    status: "loading",
    publicKey: "",
    lastState: "",
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(fetchInfoServer.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchInfoServer.fulfilled, (state, action) => {
        state.publicKey = action.payload
        state.status = "online"
      })
  },
})

export const selectInfoServer = state => state.serverInfo

export default serverInforSlice.reducer
