import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthPage from "pages/AuthPage";
import { BrowserRouter } from "react-router-dom";
import Router from "router/Router";
import { defaultOptions } from "configs/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./layouts/Layout";

function App() {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
