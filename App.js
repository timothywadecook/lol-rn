import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import store from "./store/configureStore";
import { Provider } from "react-redux";
// Components
import Router from "./Router";

export default function App() {
  const isLoading = !useCachedResources();

  if (isLoading) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
