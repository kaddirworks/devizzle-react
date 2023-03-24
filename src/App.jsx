import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import UserContext from "./context/user";

import Home from "./routes/Home";
import About from "./routes/About";
import Login from "./routes/Login";
import Register from "./routes/Register";
import SignOut from "./routes/SignOut";
import Profile from "./routes/Profile";
import Write from "./routes/Write";
import Activate from "./routes/Activate";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Client from "./client/Client";

const decorated = (Component) => {
  return (
    <>
      <Navbar />
      {Component}
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: decorated(<Home />),
  },
  {
    path: "/about",
    element: decorated(<About />),
  },
  {
    path: "/login",
    element: decorated(<Login />),
  },
  {
    path: "/register",
    element: decorated(<Register />),
  },
  {
    path: "/signout",
    element: decorated(<SignOut />),
  },
  {
    path: "/activate",
    element: decorated(<Activate />),
  },
  {
    path: "/profile",
    element: decorated(<Profile />),
  },
  {
    path: "/write",
    element: decorated(<Write />),
  },
]);

class App extends React.Component {
  constructor({ props }) {
    super(props);

    this.setUserInfo = (userInfo) => {
      this.setState({
        userInfo,
      });
    };

    this.set = (data) => {
      this.setState(data);
    };

    this.handle401 = this.handle401.bind(this);
    this.loadMoreConversations = this.loadMoreConversations.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.load = this.load.bind(this);
    this.clearContext = this.clearContext.bind(this);

    this.state = {
      error: null,
      userInfo: null,
      messages: [],
      offset: 0,
      loadProfile: this.loadProfile,
      load: this.load,
      clearContext: this.clearContext,
      setUserInfo: this.setUserInfo,
      handle401: this.handle401,
      loadMoreConversations: this.loadMoreConversations,
      set: this.set,
    };
  }

  clearContext() {
    this.setState({
      error: null,
      userInfo: null,
      messages: [],
      offset: 0,
    });
  }

  setError(error) {
    this.setState({ error });
    console.error(error);
    if (import.meta.env.DEV == true) {
      alert("Error: " + error);
    }
  }

  handle401() {
    this.setState({
      mustRelogin: true,
    });
    this.setUserInfo(null);
  }

  async loadMoreConversations() {
    let client = new Client(this.state.userInfo.accessToken);
    let result = await client.getBottlesMyMessages({
      limit: 5,
      skip: this.state.offset,
    });

    if (result.error) {
      this.setError(result.error.message);
    } else {
      this.setState({ messages: this.state.messages.concat(result.data) });
      this.setState({ offset: this.state.offset + 5 });
    }
  }

  async loadProfile(client) {
    let result = await client.getBottlesProfile();

    if (result.error) {
      this.setError(result.error.message);
    } else {
      this.setState({
        messagingProfile: result.data.id,
        dateRegistered: new Date(result.data.date_created).toLocaleDateString(),
        sentCount: result.data.sent_count,
        receivedCount: result.data.received_count,
        reputation: result.data.reputation,
        ranking: result.data.ranking,
      });
    }
  }

  async load() {
    let accessToken = document.cookie
      .split(";")
      .map((elem) => elem.trim())
      .find((elem) => elem.startsWith("access_token="))
      ?.split("=")[1];
    let username = document.cookie
      .split(";")
      .map((elem) => elem.trim())
      .find((elem) => elem.startsWith("username="))
      ?.split("=")[1];
    let userId = document.cookie
      .split(";")
      .map((elem) => elem.trim())
      .find((elem) => elem.startsWith("user_id="))
      ?.split("=")[1];

    if (!(username && userId && accessToken)) {
      this.setUserInfo(null);
      return;
    }

    this.setUserInfo({
      username,
      userId: Number.parseInt(userId),
      accessToken,
    });

    let client = new Client(accessToken);
    await this.loadProfile(client);
    await client.getBottlesReceive();

    let result = await client.getBottlesMyMessages({
      limit: 5,
      skip: this.state.offset,
    });

    if (result.error) {
      this.setError(result.error.message);
    } else{
      this.setState({ messages: result.data, viewingMessage: result.data[0] });
      this.setState({ offset: this.state.offset + 5 });
    }
  }

  async componentDidMount() {
    await this.load();
  }

  render() {
    return (
      <>
        {this.state.error && <h1>{this.state.error}</h1>}
        {!this.state.error && (
          <UserContext.Provider value={this.state}>
            <RouterProvider router={router} />
          </UserContext.Provider>
        )}
      </>
    );
  }
}

export default App;
