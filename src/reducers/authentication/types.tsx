import { 
  
} from "../../model/Movie";

export enum ActionTypes {
  LOADING_TOKEN_REQUEST = "LOADING_TOKEN_REQUEST",
  TOKEN_REQUESTED = "TOKEN_REQUESTED",
  TOKEN_REQUESTED_ERROR = "TOKEN_REQUESTED_ERROR",

  LOADING_SESSION = "LOADING_SESSION",
  SESSION_CREATED = "SESSION_CREATED",
  SESSION_CREATED_ERROR = "SESSION_CREATED_ERROR"
}

/**
 * Action Types
 */
export type LoadingTokenRequest = {
  type: ActionTypes.LOADING_TOKEN_REQUEST;
  loading: boolean;
};
export type TokenRequested = {
  token: string;
  type: ActionTypes.TOKEN_REQUESTED;
  loading: boolean;
};
export type TokenRequestedError = {
  type: ActionTypes.TOKEN_REQUESTED_ERROR;
  error: string;
  loading: boolean;
};

export type LoadingSession = {
  type: ActionTypes.LOADING_SESSION;
  loading: boolean;
};
export type CreateSession = {
  session_id: string;
  type: ActionTypes.SESSION_CREATED;
  loading: boolean;
};
export type ErrorCreateSession = {
  type: ActionTypes.SESSION_CREATED_ERROR;
  error: string;
  loading: boolean;
};

/**
 * State Type
 */
export type AuthenticationState = {
  token?: string;
  session_id?: string;
  loading: boolean;
  error?: string;
};
