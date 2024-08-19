import React, { useState, createContext, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';
import { getUserFromLocalStorage } from '../components/helper_functions/getItemFromLocalStorage';
import { defaultAppData, defaultPracticeData } from '../globalStates';

interface ModalContextType {
  showModal: boolean;
  componentToRender: ReactNode | null;
}

type ModalContextValue = [ModalContextType, Dispatch<SetStateAction<ModalContextType>>];

export const modalContext = createContext<ModalContextValue>([
  { showModal: false, componentToRender: null },
  () => {}
]);

interface ContextProviderProps {
  children: ReactNode;
}

export const ModalContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const context = useState<ModalContextType>({ showModal: false, componentToRender: null });
  return (
    <modalContext.Provider value={context}>
      {children}
    </modalContext.Provider>
  );
};

interface UserData {
  // Define the structure of your user data here
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

type UserContextType = [UserData | null, React.Dispatch<React.SetStateAction<UserData | null>>];

export const userContext = createContext<UserContextType>([null, () => {}]);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(getUserFromLocalStorage("user"));

  useEffect(() => {
    if (userData === null) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <userContext.Provider value={[userData, setUserData]}>
      {children}
    </userContext.Provider>
  );
};

export const appContext = createContext<[typeof defaultAppData, React.Dispatch<React.SetStateAction<typeof defaultAppData>>]>([defaultAppData, () => {}]);
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useState<typeof defaultAppData>(defaultAppData);
    return (
        <appContext.Provider value={context}>
            {children}
        </appContext.Provider>
    );
};

export const practiceContext = createContext<[any[], React.Dispatch<React.SetStateAction<any[]>>]>([[], () => {}]);
export const PracticeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useState<any[]>([]);
    return (
        <practiceContext.Provider value={context}>
            {children}
        </practiceContext.Provider>
    );
};

export const errorContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);
export const ErrorContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useState<boolean>(false);
    return (
        <errorContext.Provider value={context}>
            {children}
        </errorContext.Provider>
    );
};

export const feedBackContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['false', () => {}]);
export const FeedBackContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useState<string>('false');
    return (
        <feedBackContext.Provider value={context}>
            {children}
        </feedBackContext.Provider>
    );
};

export const dayViewContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([7, () => {}]);
export const DayViewContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useState<number>(7);
    return (
        <dayViewContext.Provider value={context}>
            {children}
        </dayViewContext.Provider>
    );
};
