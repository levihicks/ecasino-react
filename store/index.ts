import { configureStore } from "@reduxjs/toolkit"
import bankrollReducer from "./bankrollSlice"

export const store = configureStore({
    reducer: {
        bankroll: bankrollReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
