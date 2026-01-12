import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProviderWrapper } from "./lib/apollo";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ApolloProviderWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProviderWrapper>
);