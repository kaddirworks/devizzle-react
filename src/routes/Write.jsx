import React, { useState } from "react";
import Client from "../client/Client";
import UserContext from "../context/user";

class Write extends React.Component {
  static contextType = UserContext;

  constructor({ props }) {
    super(props);

    this.state = {
      result: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setResult(result) {
    this.setState({ result });
  }

  async handleSubmit(e) {
    e.preventDefault();

    let form = document.forms[0];
    let formData = new FormData(form);
    let client = new Client(this.context.userInfo.accessToken);
    let result = await client.bottlesSend({ message: formData.get("message") });

    console.log(result);
    if (result.id) {
      this.setResult("Your message was sent!");
      let newMessage = {
        ...result,
        responses: [],
      };
      this.context.messages.push(newMessage);
      this.context.set({ viewingMessage: newMessage });
    } else {
      this.setResult("An unexpected error has ocurred :,(");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <section className="section">
            {this.state.result && <h1>{this.state.result}</h1>}
            {!this.state.result && (
              <>
                <h1>Write a New Message</h1>
                <form>
                  <div className="field">
                    <textarea
                      name="message"
                      id="message"
                      className="textarea"
                      placeholder="Type something..."
                    ></textarea>
                  </div>
                  <input
                    className="button is-primary"
                    type="submit"
                    value="Send"
                    onClick={this.handleSubmit}
                    onSubmit={this.handleSubmit}
                  />
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default Write;
