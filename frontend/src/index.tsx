import ReactDOM from "react-dom/client";
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

import App from "./pages";
import reportWebVitals from "./reportWebVitals";

import "./styles/index.scss";

// Sentry.init({
//   dsn: "https://9d090ce0e93f4dc9b019100a2893e6ca@o1354046.ingest.sentry.io/6637157",
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
