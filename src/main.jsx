import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* AOS for scroll reveal */
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ // Инициализируем
  duration: 800, // скорость анимации (мс)
  once: true,    // анимация будет только при первом скролле
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
