import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "",
    history: [] as { date: string; mood: string }[],
}

const moodSlice = createSlice({
    name:"mood",
    initialState,
    reducers: {
        changeMood: (state, action) => {
            state.value = action.payload
        },
        setMood: (state, action) => {
            const today = new Date().toISOString().split("T")[0]
            state.value = action.payload

            state.history.push({date: today, mood: state.value})
        },
    }
})

export const {changeMood, setMood} = moodSlice.actions
export default moodSlice.reducer