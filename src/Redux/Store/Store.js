import { configureStore } from '@reduxjs/toolkit';
import QrtimeReducer from '../Slices/QRTimeSlice'
export const store = configureStore({
    reducer: {
        Qrstate:QrtimeReducer
    },
  })

