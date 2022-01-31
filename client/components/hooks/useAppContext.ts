import React from 'react';
import { _AppContext } from 'components/AppContext';

export default function useAppContext() {
  const appContext = React.useContext(_AppContext);

  return appContext;
}
