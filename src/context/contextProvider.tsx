import { useState, createContext, useEffect } from 'react';
import { getUserFromLocalStorage } from '../components/helper_functions/getItemFromLocalStorage';
import { defaultAppData } from '../globalStates';

export const modalContext = createContext<any>({showModal: false, componentToRender: null});
export const ModalContextProvider = (props : any) => {
    const context = useState({showModal: false, componentToRender: null});
    return (
        <modalContext.Provider value={context}>
            {props.children}
        </modalContext.Provider>
    );
}

export const userContext = createContext<any>(getUserFromLocalStorage("user"));
export const UserContextProvider = (props : any) => {
    const context = useState(getUserFromLocalStorage("user"));
    const [ userData ] = context;
    useEffect(() => {
        if(userData == null) localStorage.removeItem("user");
        else localStorage.setItem("user", JSON.stringify(userData))
    }, [userData])

    return (
        <userContext.Provider value={context}>
            {props.children}
        </userContext.Provider>
    );
}

export const appContext = createContext<any>(defaultAppData);
export const AppContextProvider = (props : any) => {
    const context = useState(defaultAppData);

    return (
        <appContext.Provider value={context}>
            {props.children}
        </appContext.Provider>
    );
}

export const practiceContext = createContext<any>(defaultAppData);
export const PracticeContextProvider = (props : any) => {
    const context = useState([]);

    return (
        <practiceContext.Provider value={context}>
            {props.children}
        </practiceContext.Provider>
    );
}

export const errorContext = createContext<any>(false);
export const ErrorContextProvider = (props : any) => {
    const context = useState(false);
    return (
        <errorContext.Provider value={context}>
            {props.children}
        </errorContext.Provider>
    );
}

export const feedBackContext = createContext<any>('false');
export const FeedBackContextProvider = (props : any) => {
    const context = useState<any>("false");
    return (
        <feedBackContext.Provider value={context}>
            {props.children}
        </feedBackContext.Provider>
    );
}

export const dayViewContext = createContext<any>(7);
export const DayViewContextProvider = (props : any) => {
    const context = useState<any>(7);
    return (
        <dayViewContext.Provider value={context}>
            {props.children}
        </dayViewContext.Provider>
    );
}