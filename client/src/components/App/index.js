import React from "react";
import Navbar from "../Navbar";
import AuthProvider from "../Auth/AuthProvider";
import Footer from "../Footer";
import Router from "../Router";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { getReducer } from "sparql-connect";

//`getReducer` creates the reducer used by sparql-connect
const store = createStore(getReducer());

function App() {
  console.log("redux store", store);

  return (
    // <Provider store={store}>
    // <AuthProvider>
    //   <BrowserRouter>
    //   <Navbar />
    //   <ResourcesList />
    //     <Router />
    //     <Footer />
    //   </BrowserRouter>
    // </AuthProvider>
    // </Provider>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Router />
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
