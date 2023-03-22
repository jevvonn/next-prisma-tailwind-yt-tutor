import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const queryClient = new QueryClient();

export const QueryWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
