// ClientProvider.tsx
"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider = ({ children }: ClientProviderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
