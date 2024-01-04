import { createSlice } from "@reduxjs/toolkit";

const QrtimeSlice = createSlice({
    name:'QrtimeSlice',
    initialState:false,
    reducers:{
        handleQrtimeSlice(state,action){
            console.log(action)
        }
    }
})


export const {handleQrtimeSlice}=QrtimeSlice.actions;
export default QrtimeSlice.reducer;