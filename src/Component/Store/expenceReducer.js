import { createSlice } from "@reduxjs/toolkit";

const expenceState = {
    expenceData:[],
    key:[],
}

const expenceSlice = createSlice({
    name:'expence',
    initialState:expenceState,
    reducers:{
        expenceUpdater(state,action){
            state.expenceData = action.payload
        },
        keyUpdater(state,action){
            state.key = action.payload
        }
    }
})

export  const exenceAction = expenceSlice.actions
export default expenceSlice.reducer