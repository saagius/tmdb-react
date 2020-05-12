import { ThunkDispatch } from "redux-thunk";
import { 
  ActionTypes,
  TokenRequested,
  TokenRequestedError,
  LoadingTokenRequest,
  CreateSession,
  ErrorCreateSession,
  LoadingSession
} from "./types";
import Fetch from "../../helpers/Fetch";

interface RequestTokenResponse {
  success: boolean;
  request_token: string;
  expires_at: string;
  status_message?: string;
  status_code?: string;
}

interface SessionResponse {
  success: boolean;
  session_id: string;
  status_message?: string;
  status_code?: string;
}

export const createRequestToken = (): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, TokenRequested | TokenRequestedError | LoadingTokenRequest>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_TOKEN_REQUEST,
      loading: true
    });

    Fetch.get('/authentication/token/new')
      .then((response: RequestTokenResponse) => {
        if(response.success) {
          dispatch({
            type: ActionTypes.TOKEN_REQUESTED,
            loading: false,
            token: response.request_token
          });
          window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=http://localhost:3000/approved`;
          return;
        }

        dispatch({
          type: ActionTypes.TOKEN_REQUESTED_ERROR,
          error: response.status_message as string,
          loading: false
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.TOKEN_REQUESTED_ERROR,
          error,
          loading: false
        });
      });
  };
};

export const createSession = (request_token: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, CreateSession | ErrorCreateSession | LoadingSession>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_SESSION,
      loading: true
    });

    Fetch.post('/authentication/session/new', {
      request_token
    })
      .then((response: SessionResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.SESSION_CREATED,
            loading: false,
            session_id: response.session_id
          });
        }

        dispatch({
          type: ActionTypes.SESSION_CREATED_ERROR,
          error: response.status_message as string,
          loading: false
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.SESSION_CREATED_ERROR,
          error,
          loading: false
        });
      });
  };
};