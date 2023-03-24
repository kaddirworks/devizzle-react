import React from "react";
import Client from "../../client/Client";
import UserContext from "../../context/user";

class UserConversationReplyForm extends React.Component {
  static contextType = UserContext;

  constructor({ props }) {
    super(props);
    this.handleSendResponse = this.handleSendResponse.bind(this);
  }

  async handleSendResponse(e) {
    e.preventDefault();

    let form = document.forms[0];
    let response = new FormData(form).get("response");
    let body = {
      response,
      responding_to_id: this.context.viewingMessage.id,
    };

    let client = new Client(this.context.userInfo.accessToken);
    let result = await client.postBottlesRespond(body);

    if (result.error) {
      this.context.setError(result.error.message);
    } else {
      let newViewingMessage = { ...this.context.viewingMessage };
      newViewingMessage.responses.push(result.data);
      this.context.set({
        viewingMessage: newViewingMessage,
      });
      document.querySelector("#response").value = "";
    }
  }

  render() {
    return (
      <form className="column">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Type something..."
              name="response"
              id="response"
            />
          </div>

          <div className="control">
            <button
              className="button is-primary"
              onClick={this.handleSendResponse}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default UserConversationReplyForm;
