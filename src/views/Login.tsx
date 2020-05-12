import React from "react";
import { connect } from "react-redux";
import * as AuthenticationActions from "../reducers/authentication/actions";

import "./Login.scss";

interface DispatchProps {
    createRequestToken: () => void
}
 
type Props = DispatchProps;

class LoginComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    this.props.createRequestToken();
  }

  render() {
    return (
      <>
        <div className="login-view">
          <div className="login" onClick={this.login}>Login</div>
        </div>
      </>
    );
  }
}

export default connect(null, AuthenticationActions)(LoginComponent);