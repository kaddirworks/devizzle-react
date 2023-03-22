import React from "react";

class About extends React.Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <section className="section" id="main">
            <h1>About</h1>
            <small>First of all, is this font too small?</small>
            <p>
              Hello, I hope you are doing well! If you are here, probably it's
              because you want to know what on earth this is. Let me explain it
              to you.
            </p>
            <p>
              I created this (mostly) as a portifolio project, so I could have
              something interesting to show to potential employers. I also
              wanted to test my own ability to develop and maintain a space like
              this.
            </p>
            <p>
              As a secondary but not less important goal, I want people to have
              a safe and interesting place to have conversations about whatever
              they want or make friends. We all (mostly) know how it's difficult
              to get to know new people in today's era, so my hopes are that I
              can at least help with this.
            </p>
          </section>
          
          <section className="section">
            <h2>
              What does <strong>"Devizzle"</strong> mean?
            </h2>
            <small>Good question.</small>
            <p>
              One day when I was working on a completely different project I
              needed a name. Since I'm bad at naming things I put a few topic on
              a brand name generator and it came up with a bunch of names. This
              is the one I chose.
            </p>
            <p>
              My best guess is that one of the topics I put in the generator was
              "tech", so the "dev" part probably comes from "developer" or
              "development". Now the "izzle"... well, if you have a theory you
              can let me know!
            </p>
            <p>
              The domain name was actually for said completelly different
              project but I gave up on it and still had some months left. No one
              knows what the other project was so it is fine (I hope).
            </p>
          </section>

          <section className="section">
            <h2>Who is this for?</h2>
            <small>Good question again.</small>
            <p>
              I think anyone bored enough to talk to strangers on the internet
              can use this. I also want to, one day, hear stories from someone
              who met a good friend (or maybe even the love of their lives, if
              that's not too optimistic) using this hobby project. That would
              make me really happy. I am not really sure. This is at the same
              time, kind of an experiment and a portifolio project.
            </p>
            <p>
              I like to think the objective is to have a place where you can go
              and make new friends or at the very least have interesting
              conversations.
            </p>
          </section>

          <section className="section">
            <h2>
              Who is this <strong>NOT</strong> for?
            </h2>
            <small>Just in case this comes as a surprise.</small>
            <p>
              If you plan on using this place to spread any kind of
              misinformation, hate speech, catfishing, self-promoting, or
              anything that is not nice this is not the place for you and you
              should go somewhere else. Actually, what even is wrong with you if
              you do that?
            </p>
            <p>
              Whilst I am not able to actively moderate or pay someone to do so,
              there is the option to report messages on your conversation panel.
              Reported messages will be investigated and the perpetrator's
              account deleted.
            </p>
          </section>
        </div>
      </div>
    );
  }
}
export default About;
