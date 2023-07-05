'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type DataType = {
  firstName: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
  cart: any;
  setCart: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: '',
  setUserId: (): string => '',
  data: [],
  setData: (): DataType[] => [],
  cart: {},
  setCart: (): any => {}
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState<[] | DataType[]>([]);
  const [cart, setCart] = useState<any>({});

  return (
    <GlobalContext.Provider value={{ userId, setUserId, data, setData, cart, setCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
