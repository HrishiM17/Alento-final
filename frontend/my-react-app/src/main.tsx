import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner"; // optional for toast notifications
import "./index.css";
import App from "./App";

// ✅ Create a TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* ✅ Provide TanStack Query globally */}
    <QueryClientProvider client={queryClient}>
      {/* ✅ Global App */}
      <App />

      {/* ✅ React Query Devtools (optional for debugging) */}
      <ReactQueryDevtools initialIsOpen={false} />

      {/* ✅ Global toaster notifications (optional) */}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  </StrictMode>
);
