import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./AppDev";
import "./index.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/theme.css";
import "./assets/css/style.css";


// this manifest is used temporarily for development purposes
// const manifestUrl =
//   "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

window.addEventListener('DOMContentLoaded', () => {
  if (window.Telegram?.WebApp) {
      // Initialize Telegram Web Apps SDK
      window.Telegram.WebApp.ready();
      //Expand Web App window automatically to full height
      window.Telegram.WebApp.expand();
      // Call disableVerticalSwipes() to prevent vertical swipes
      window.Telegram.WebApp.disableVerticalSwipes();
  }
});
// const queryClient = new QueryClient({
//   defaultOptions: { queries: { refetchOnWindowFocus: false } },
// });

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <TonConnectUIProvider manifestUrl={manifestUrl}>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </TonConnectUIProvider>
// );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

