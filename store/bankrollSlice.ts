import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "."

interface BankrollState {
    value: number;
}

const initialState: BankrollState = {
    value: 1000
}

export const bankrollSlice = createSlice({
    name: 'bankroll',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        decrement: (state, action: PayloadAction<number>) => {
            state.value -= action.payload
        },
    }
})

export const {
    increment,
    decrement
} = bankrollSlice.actions

export const selectCount = (state: RootState) => state.bankroll.value

export default bankrollSlice.reducer