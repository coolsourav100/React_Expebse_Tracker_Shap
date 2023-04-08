import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./AuthReducer";
import expenceSliceReducer from "./expenceReducer";

const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        expence : expenceSliceReducer
    }
})

export default store;