import React, { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AppStore, store } from './store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  } else {
    console.warn(storeRef.current.getState());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
