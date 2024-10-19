import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice.js"

const store=configureStore({
    reducer:AuthReducer
})

export default store