import { configureStore } from '@reduxjs/toolkit'
import features from '../Features'

export default configureStore({
    reducer: {
        userInfo: features,
    },
})