import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
