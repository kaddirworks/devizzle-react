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

    console.log(result)
    if (result.id) {
      this.setResult("Your message was sent!");
      this.context.messages.push({
        ...result,
        responses: [],
      });
    } else {
      this.setResult("An unexpected error has ocurred :,(");
    }

    console.log(result);

    // fetch("http://localhost:8000/bottles/send", {
    //   headers: {
    //     Authorization: "Bearer " + this.context.userInfo.accessToken,
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   body,
    // }).then(
    //   (res) => {
    //     res.json().then(
    //       (data) => {
    //         if (!res.ok) this.setResult(data.detail);
    //         else {
    //           this.setResult("Your message was sent!");
    //           this.context.messages.push({
    //             ...data,
    //             responses: [],
    //           });
    //         }
    //       },
    //       (err) => this.setResult(JSON.stringify(err))
    //     );
    //   },
    //   (err) => this.setResult(JSON.stringify(err))
    // );
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
