import { createSlice } from "@reduxjs/toolkit";

const expenceState = {
    expenceData:[]
}

const expenceSlice = createSlice({
    name:'expence',
    initialState:expenceState,
    reducers:{
        expenceUpdater(state,action){}
    }
})

export  const exenceAction = expenceSlice.actions
export default expenceSlice.reducer