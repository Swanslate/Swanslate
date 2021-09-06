import React from "react";
import { IContext, ITasks, IUserInfo } from "../entities/IContext";

export function contextReducer(state: IContext, action: Action): IContext {
    switch (action.type) {
        case SIGN_IN: {
            return {
                ...state,
                userInfo: {
                    ...action.payload
                }
            };
        }
        case GET_TASKS: {
            return {
                ...state,
                tasks: {
                    ...action.payload
                }
            };
        }

        case UPDATE_TRANSLATE_TASKS: {
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    translateTasks: [...state.tasks.translateTasks.filter(task => task.id != action.payload)]
                }
            };
        }
        case UPDATE_VALIDATION_TASKS: {
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    validationTasks: [...state.tasks.validationTasks.filter(task => task.id != action.payload)]
                }
            };
        }


        default:
            return state;
    }
}


type Action = { type: typeof SIGN_IN; payload: IUserInfo; }
    | { type: typeof GET_TASKS, payload: ITasks; }
    | { type: typeof UPDATE_TRANSLATE_TASKS, payload: number; }
    | { type: typeof UPDATE_VALIDATION_TASKS, payload: number; };

export const SIGN_IN = 'SIGNIN';
export const GET_TASKS = 'GET_TASKS';
export const UPDATE_TRANSLATE_TASKS = 'UPDATE_TRANSLATE_TASKS';
export const UPDATE_VALIDATION_TASKS = 'UPDATE_VALIDATION_TASKS';
