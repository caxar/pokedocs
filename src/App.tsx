import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import Home from "./components/Home";
import Header from "./components/Home/Header";

// "@typescript-eslint/typescript-estree": "^5.57.1",
// "fork-ts-checker-webpack-plugin": "^6.5.3",
// "typescript": "^5.0.3",

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
