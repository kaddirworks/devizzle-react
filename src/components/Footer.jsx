import React from "react";

class Footer extends React.Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <div className="columns">
          <div className="column">
            <strong>Disclaimer</strong>
            <p>
              This is a work in progress project made in my free time. If you
              encounter any issues or have a suggestion, please do not hesitate
              in contacting me. :)
            </p>
            <p>Proudly made in Brazil.</p>
          </div>
          <div className="column">
            <strong>Contact Info</strong>
            <p>
              <span title="Discord">
                <i className="fa-brands fa-discord"></i>
              </span>{" "}
              kaddir#9770
            </p>
            <p>
              <span title="Slack/Email">
                <i className="fa-brands fa-slack"></i>
              </span>{" "}
              wesleybarros950@gmail.com
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
