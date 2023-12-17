import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./index.scss";
import { ConfigProvider, theme } from "antd";

const { darkAlgorithm } = theme;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7320C1",
        },
        components: {
          Segmented: {
            colorBgLayout: "#40354E",
            itemActiveBg: "rgba(255,255,255, 0.5)",
            itemSelectedBg: "#DAED6D",
            itemSelectedColor: "#000",
          },
          Progress: {
            defaultColor: "#DAED6D",
          },
        },
        algorithm: darkAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
