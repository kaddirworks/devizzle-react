import React from "react";

import { Link, Navigate } from "react-router-dom";

import UserContext from "../context/user";

import Client from "../client/Client";

class Login extends React.Component {
  static contextType = UserContext;

  constructor({ props }) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };

    this.setError = (err) => {
      this.setState({ error: err });
    };

    this.handleLogin = (accessToken, userId, username, expiration) => {
      let exp = new Date(expiration).toUTCString();
      document.cookie = `access_token=${accessToken}; SameSite=None; expires=${exp}; Secure;`;
      document.cookie = `username=${username}; SameSite=None; expires=${exp}; Secure;`;
      document.cookie = `user_id=${userId}; SameSite=None; expires=${exp}; Secure;`;

      this.context.setUserInfo({ username, accessToken: accessToken, userId });
      this.context.load();
    };

    this.onSubmit = async (e) => {
      e.preventDefault();

      let form = document.forms[0];
      let formData = new FormData(form);
      let client = new Client(null);

      let result = await client.postAuthLogin(formData);
      if (result.error) {
        this.setError(result.error.message);
        console.log(result.error)
      } else {
        this.handleLogin(
          result.data.access_token,
          result.data.user_id,
          result.data.username,
          result.data.expiration
        );
      }
    };
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <section className="section">
            <form className="box">
              <h1 className="title">Login</h1>

              {this.state.error && (
                <p className="tag is-danger is-medium" id="message">
                  {this.state.error}
                </p>
              )}

              {this.context.userInfo && !this.context.mustRelogin && (
                <Navigate to="/profile" />
              )}

              <div className="field">
                <input
                  className="input"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <input
                className="button is-primary"
                type="submit"
                value="Submit"
                onClick={this.onSubmit}
                onSubmit={this.onSubmit}
              />
            </form>
            <p>
              Does not have an account? Sign up <Link to="/register">here</Link>
              .
            </p>
          </section>
        </div>
      </div>
    );
  }
}

export default Login;
