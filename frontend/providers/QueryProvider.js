"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useState } from "react";

export default function QueryProvider({
  children,
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2 * 60 * 1000,

            gcTime: 10 * 60 * 1000,

            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
