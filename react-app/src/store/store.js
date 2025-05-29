import {configureStore} from '@reduxjs/toolkit'
// import homePageSlice from '../slice/homePageSlice'
import homePageSlice from '../slice/homePageSlice'

export const store = configureStore({
    reducer:{
        home : homePageSlice
    }
})