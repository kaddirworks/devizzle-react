import React from "react";
import Client from "../../client/Client";
import UserContext from "../../context/user";
import UserConversationHistoryItem from "./UserConversationHistoryItem";
import UserConversationReplyForm from "./UserConversationReplyForm";

class UserConversationHistoryPanel extends React.Component {
  static contextType = UserContext;

  constructor({ props }) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);

    this.handleReportConfirm = this.handleReportConfirm.bind(this);
  }

  scrollChat() {
    let historyPanel = document.querySelector("#history-panel");
    historyPanel?.scroll({
      top: historyPanel.scrollHeight,
      behavior: "smooth",
    });
  }

  componentDidUpdate() {
    this.scrollChat();
  }

  openModal($el) {
    $el.classList.add("is-active");
  }

  closeModal($el) {
    $el.classList.remove("is-active");
  }

  closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      this.closeModal($modal);
    });
  }

  componentDidMount() {
    this.scrollChat();

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-trigger") || []).forEach(
      ($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener("click", () => {
          this.openModal($target);
        });
      }
    );

    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");

      $close.addEventListener("click", () => {
        this.closeModal($target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) {
        // Escape key
        this.closeAllModals();
      }
    });
  }

  async handleReportConfirm() {
    let client = new Client(this.context.userInfo.accessToken);
    let result = await client.bottlesReport(this.context.viewingMessage.id);

    if (result.id) {
      let msgIdx = this.context.messages.indexOf(this.context.viewingMessage);
      this.context.messages.splice(msgIdx, 1);
      this.context.set({
        viewingMessage: this.context.messages[msgIdx],
      });
      this.closeAllModals();
    }
  }

  render() {
    return (
      <>
        <div className="tile is-vertical is-8">
          <div className="tile is-parent">
            <article className="tile is-child">
              <p className="title">
                History
                {this.context.viewingMessage && (
                  <span>
                    {" "}
                    <a
                      className="js-modal-trigger icon-text tag is-danger is-light"
                      data-target="report-modal"
                    >
                      <span className="icon">
                        <i className="fa-solid fa-flag"></i>
                      </span>
                      <span>Report</span>
                    </a>
                  </span>
                )}
              </p>
              <div
                style={{
                  maxHeight: "30em",
                  minHeight: "30em",
                  height: "30em",
                  overflow: "auto",
                }}
                id="history-panel"
              >
                <UserConversationHistoryItem
                  message={this.context.viewingMessage}
                />
                {this.context.viewingMessage &&
                  this.context.viewingMessage.responses &&
                  this.context.viewingMessage.responses.map((response) => {
                    return (
                      <UserConversationHistoryItem
                        key={`response-${response.id}`}
                        message={response}
                      />
                    );
                  })}
              </div>
              <UserConversationReplyForm />
            </article>
          </div>
        </div>

        <div className="modal" id="report-modal">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <h4>Are you sure?</h4>
              <p>
                By reporting this conversation you will not be able to respond
                or see until it has been examined.
              </p>
              <div className="buttons">
                <a
                  className="button is-danger"
                  onClick={this.handleReportConfirm}
                >
                  Yes, report it.
                </a>
              </div>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>
      </>
    );
  }
}

export default UserConversationHistoryPanel;
