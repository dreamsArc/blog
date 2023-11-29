import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/Context";
import axios from "axios";

const getCsrfToken = async () => {
  const { data } = await axios({
    method: "GET",
    url: "http://localhost:3000/csrf-token",
    withCredentials: true,
  });
  console.log(data.csrfToken);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["x-csrf-token"] = data.csrfToken;
};

getCsrfToken();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
