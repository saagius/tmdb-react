import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthenticationState } from "./authentication/types";
import authenticationReducer from "./authentication/reducer";
import { MovieState } from "./movies/types";
import movieReducer from "./movies/reducer";

export type RootState = {
  authentication: AuthenticationState;
  movies: MovieState;
};

const rootReducer = combineReducers({
  authentication: authenticationReducer(),
  movies: movieReducer()
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;