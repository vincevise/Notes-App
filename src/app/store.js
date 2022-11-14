import {configureStore} from '@reduxjs/toolkit'
import notesReducer from '../features/notesSlice'
import navBarReducer from '../features/navbarSlice'

export const store = configureStore({
    reducer:{
        notes:notesReducer,
        navbar: navBarReducer
    }
})