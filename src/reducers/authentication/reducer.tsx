import {
  ActionTypes,
  TokenRequested,
  AuthenticationState,
  TokenRequestedError,
  LoadingTokenRequest
} from "./types";

const initialState: AuthenticationState = {
  loading: false
};

const authenticationReducer = () => {
  return (
    state = initialState,
    action: TokenRequested | TokenRequestedError | LoadingTokenRequest
  ) => {
    switch (action.type) {
      case ActionTypes.LOADING_TOKEN_REQUEST:
        return { ...state, loading: action.loading };

      case ActionTypes.TOKEN_REQUESTED:
        return {
          ...state,
          token: action.token,
          loading: action.loading
        };
      case ActionTypes.TOKEN_REQUESTED_ERROR:
        return { ...state, error: action.error, loading: action.loading };
      default:
        return state;
    }
  };
};

export default authenticationReducer;
