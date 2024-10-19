import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}
const AuthSlice=createSlice({
    name:"Auth",
    initialState,
    reducers:{
        login: (state,action)=>{
            state.status=true,
            state.userData=action.payload.userData;
        },
        logout:(state)=>{
            state.status=false,
            state.userData=null;
        }
    }
})
export const {login,logout}=AuthSlice.actions

export default AuthSlice.reducer