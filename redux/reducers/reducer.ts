import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface user {
    isSignIn: boolean;
    userAuth: {
        userName: string,
        accessToken: string,
        uid: string;
    },
}

const initialState: user = {
    isSignIn: false,
    userAuth: {
        userName: "",
        accessToken: "",
        uid: ""
    },

};

export const taskSlice = createSlice({
    name: 'translateTasks',
    initialState,
    reducers: {
        userSignIn: (state, action: PayloadAction<user>) => {
            state = action.payload;
        }
    },
});

export const { userSignIn } = taskSlice.actions;

export default taskSlice.reducer;