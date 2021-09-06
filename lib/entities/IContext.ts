export interface IUserInfo {
    isSignIn: boolean;
    userAuth: {
        accessToken: string;
        userName: string;
        uid: string;
    };
}

export type translateTask = { sentence: string, id: number; };
export type validateTask = { originalText: string; translatedText: { [key: string]: string; }; id: number; }

export interface ITasks {
    translateTasks: Array<translateTask>;
    validationTasks: Array<validateTask>;
}

export interface IContext {
    userInfo: IUserInfo;
    tasks: ITasks;
}