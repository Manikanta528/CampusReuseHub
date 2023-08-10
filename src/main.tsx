import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Bugfender } from '@bugfender/sdk';

Bugfender.init({
  appKey: import.meta.env.VITE_BUGFENDER_APP_KEY,
  // apiURL: 'https://api.bugfender.com',
  // baseURL: 'https://dashboard.bugfender.com',
  // overrideConsoleMethods: true,
  // printToConsole: true,
  // registerErrorHandler: true,
  // logBrowserEvents: true,
  // logUIEvents: true,
  // version: '',
  // build: '',
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
