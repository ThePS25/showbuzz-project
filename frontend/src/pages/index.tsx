import { ConfigProvider } from "antd";
import AppContext from "antd/es/app/context";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./login";

const App = () => {
  return (
    <ConfigProvider theme={{ token: { fontFamily: "inherit" } }}>
      {/* <AppContext.Provider value={}> */}
      <BrowserRouter>
        <Suspense
          fallback={
            // <PrivateLayout>
            <></>
            // </PrivateLayout>
          }
        >
          <Routes>
            <Route path="/" element={<>LoginPage</>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* </AppContext.Provider> */}
    </ConfigProvider>
  );
};

export default App;
