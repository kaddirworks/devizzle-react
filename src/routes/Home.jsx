import React from "react";

import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    return (
      <>
        <section className="hero is-large is-link">
          <div className="hero-body">
            <p className="title is-size-1 has-text-weight-bold">Devizzle</p>
            <p className="subtitle">Send your message to the world.</p>
            <a className="button is-primary has-text-weight-bold" href="#how-it-works">
              Learn More
            </a>
          </div>
        </section>

        <div className="container">
          <div className="content">
            {/* <section className="section">
              <h1>Welcome</h1>
              <p></p>
            </section> */}

            <section className="section" id="how-it-works">
              <h2>How it Works</h2>
              <small>A short guide on how to use this.</small>
              <p>
                First things first you need an account. Click "Sign up" at the
                top right corner of the page. After submitting your details, a
                confirmation email will be sent to you with a link to activate
                your account. After you have successfully (this part is
                important, as this was apparently made by a donkey) activated,
                you can login to your account. Click the "Log in" button to the
                right of the "Sign up button".
              </p>
              <p>
                If everything goes right, you will be presented with your
                profile page. Here you can write new messages or respond to a
                message you received. Every time you login, a random message
                sent by someone else will be picked and added to your inbox.
                This message can be from literally anyone around the globe. Cool
                isn't it?
              </p>
              <p>
                This is the interesting part: you can write literally anything
                that is on your mind. And send to someone else. If they respond
                to you, great! If they don't, well... better luck next time. But
                keep trying!
              </p>
              <p>
                Are you ready to <Link to="/register">start</Link>?
              </p>
            </section>

            <section className="section">
              <h2>A Little Help</h2>
              <small>Or just to "fill sausages" as they say in Brazil.</small>
              <p>
                Ideally, you should try to start with something interesting to
                send. Something that will spark the curiosity of whoever lucky
                person receives your message.
              </p>
              <p>
                There aren't any rules (apart from what is stated{" "}
                <Link to="/about">here</Link>) regarding what you should write.
                But here are some ideas to get started:
              </p>
              <ul>
                <li>
                  Write a small story and send to someone to ask for feed back:
                  maybe not, but I think it would be great if you had a
                  one-on-one feedback session with someone who doesn't know you
                  and thus is not biased.
                </li>
                <li>
                  Start an ARG: no one will know who you are so it's the perfect
                  place! - probably too nerdy for most people, but if you are
                  into that kind of stuff, props to us!
                </li>
                <li>
                  Tell a bit about your life: how about telling us a bit about
                  your life? It's always interesting to see how other people
                  live in other parts of the world, know other cultures, etc...
                </li>
                <li>
                  Anything really: as long as you think it's gonna be
                  interesting for someone else.
                </li>
              </ul>
              <p>
                I ran out of ideas, but hope you get the gist of it.{" "}
                <strong>Be creative</strong> and get many responses to your
                messages. I implemented a simple reputation system based on how
                many responses you receive to keep you invested.
              </p>
            </section>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
