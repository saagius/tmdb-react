import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./reducers/store";

const MyApp = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <App />
      </Provider>
    </Fragment>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("root"));

serviceWorker.unregister();