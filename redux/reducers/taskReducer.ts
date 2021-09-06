import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface taskReducer {
    translateTasks: Array<{ sentence: string; }>;
    validationTasks: Array<{ sentence: string; }>;
}

const initialState: taskReducer = {
    translateTasks: [],
    validationTasks: []
};

export const taskSlice = createSlice({
    name: 'translateTasks',
    initialState,
    reducers: {
        generateTasks: (state, action: PayloadAction<taskReducer["translateTasks"]>) => {
            const randomIndex = Math.floor(Math.random() * 100);
            state.translateTasks = action.payload.slice(randomIndex);
            state.translateTasks.push(...action.payload.slice(0, randomIndex - 1));
        },
        addValidationTasks: (state, action: PayloadAction<number>) => {
            state.validationTasks.push(state.translateTasks[action.payload]);
            state.translateTasks.shift();
        },
    },
});

export const { generateTasks, addValidationTasks } = taskSlice.actions;

export default taskSlice.reducer;