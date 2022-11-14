import { createSlice } from "@reduxjs/toolkit"


let initialState = {
    isLight:true,
    isStack:false
}

const navbarSlice = createSlice({
    name:'navbar',
    initialState,
    reducers:{
        toggleLight(state,action){
            state.isLight = !state.isLight 
        },
        toggleGrid(state,action){
            state.isStack = !state.isStack 
        }
    }
})

export const navBarData = (state) => state.navbar

export const {toggleLight,toggleGrid} = navbarSlice.actions;

export default navbarSlice.reducer;