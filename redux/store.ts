import { configureStore } from "@reduxjs/toolkit";
import baseReducer from "./reducers/reducer";
import taskReducer from "./reducers/taskReducer";


export const store = configureStore({
    reducer: {
        userInfo: baseReducer,
        tasks: taskReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


