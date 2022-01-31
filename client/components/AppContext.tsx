import React, { createContext, useState } from 'react';

export const _AppContext = createContext<any>(null);

interface AppContextProps {
  children: React.ReactNode;
}

export default function AppContext({ children }: AppContextProps) {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <_AppContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </_AppContext.Provider>
  );
}
