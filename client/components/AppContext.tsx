import React, { createContext, useState } from 'react';

export const _AppContext = createContext<any>(null);

interface AppContextProps {
  children: React.ReactNode;
}

export type UserInfo = {
  userid: number;
  first_name: string;
  last_name: string;
  email: string;
};

export default function AppContext({ children }: AppContextProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <_AppContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </_AppContext.Provider>
  );
}
