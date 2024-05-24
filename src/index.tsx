import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeProvider from "./components/theme-provider/ThemeProvider";

import GuardAuth from "./components/guard-auth/GuardAuth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <GuardAuth>
          <App />
        </GuardAuth>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
