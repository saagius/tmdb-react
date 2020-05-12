import React from "react";
import { connect } from "react-redux";
import {
    RouteComponentProps,
    withRouter
  } from "react-router-dom";
import * as AuthenticationActions from "../reducers/authentication/actions";

interface ISearch {
    approved: boolean;
    request_token: string;
}

interface StateProps {
    search: ISearch;
}

interface DispatchProps {
    createSession: (request_token: string) => void
}
 
type Props = DispatchProps & RouteComponentProps;

class TokenVerificationComponent extends React.Component<Props, StateProps> {
  constructor(props: Props) {
    super(props);

    let search = new URLSearchParams(this.props.location.search);
    let approved = search.get('approved');
    let request_token = search.get('request_token') as string;

    this.state = {
        search: {
            approved: approved === 'true',
            request_token
        }
    }

    if(approved) {
        this.props.createSession(request_token);
        setTimeout(() => {
            this.props.history.push(`/movies`);
        }, 500);
    }
  }

  render() {
    const {
        approved
    } = this.state.search;

    if(approved) {
        return (
        <>
            <div>Redirecting...</div>
        </>
        );
    }

    return (
        <>
            <div>Cannot login.</div>
        </>
    )
  }
}

export default connect(null, AuthenticationActions)(withRouter(TokenVerificationComponent));