import React from "react";

import { Navigate } from "react-router-dom";
import UserBasicInfoPanel from "../components/profile/UserBasicInfoPanel";
import UserMessagesPanel from "../components/profile/UserMessagesPanel";

import UserContext from "../context/user";

class Profile extends React.Component {
  static contextType = UserContext;

  constructor({ props }) {
    super(props);
  }

  render() {
    if (!this.context.userInfo)
      return (
        <section className="section">
          <p>Loading...</p>
        </section>
      );

    if (this.context.mustRelogin) return <Navigate to="/login" />;

    return (
      <>
        <div className="container">
          <div className="content">
            <section className="section">
              <h1>
                Welcome back, <strong>{this.context.userInfo.username}</strong>!
              </h1>
              <p>
                Come here to check if your messages have been received by someone.
              </p>
              <UserMessagesPanel />
            </section>
            <section className="section">
              <UserBasicInfoPanel />
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
