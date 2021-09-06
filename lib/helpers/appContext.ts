import React from "react";
import { createContext } from "react";
import { IContext } from "../entities/IContext";

export const initialState: IContext = {
    userInfo: {
        isSignIn: false,
        userAuth: {
            userName: "",
            accessToken: "",
            uid: ""
        }
    },
    tasks: {
        translateTasks: [],
        validationTasks: []
    }
};

const AppContext = createContext<{ state: IContext; dispatch: React.Dispatch<any>; }>({ state: initialState, dispatch: () => null });

export default AppContext;