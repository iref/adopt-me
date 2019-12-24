import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Link, Router } from "@reach/router";
import Details from "./Details";
import SearchParams from "./SearchParams";
import store from "./store";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
