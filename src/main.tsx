import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Bugfender } from '@bugfender/sdk';

import AOS from 'aos';
import 'aos/dist/aos.css';

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
AOS.init();


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
