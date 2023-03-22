import React from "react";
import { Link, Navigate } from "react-router-dom";

class Activate extends React.Component {
  constructor({ props }) {
    super(props);

    this.state = {
      done: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ done: true });
    }, 5000);
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <section className="section">
            <div className="box">
              <h1>Your account was activated!</h1>
              <p>
                You can now proceed to <Link to="/login">login</Link>.
              </p>
              {this.state.done && <Navigate to="/login" />}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Activate;
