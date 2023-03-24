import React, { useState } from "react";
import { Link } from "react-router-dom";
import Client from "../client/Client";

function Register() {
  const [error, setError] = useState(null);
  const [usedEmail, setUsedEmail] = useState(null);
  const [isDone, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    let registerForm = document.forms[0];
    let formData = new FormData(registerForm);
    let client = new Client(null);
    let result = await client.postAuthRegister(Object.fromEntries(formData));

    if (result.error) {
      setError(result.error.message);
    } else {
      setDone(true);
      setUsedEmail(result.data.email);
    }
  }

  return (
    <div className="container">
      <div className="content">
        <section className="section">
          <form className="box">
            {isDone && <h1>A confirmation message was sent to {usedEmail}!</h1>}
            {!isDone && (
              <>
                <h1>Register</h1>

                {error && <p className="tag is-danger is-medium">{error}</p>}

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
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
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
                <div className="field">
                  <input
                    className="input"
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    placeholder="Password Confirmation"
                  />
                </div>
                <input
                  className="button is-primary"
                  type="submit"
                  value="Submit"
                  onClick={onSubmit}
                  onSubmit={onSubmit}
                />
              </>
            )}
          </form>
          <p>
            Already have an account? Click <Link to="/login">here</Link> to sign
            in.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Register;
