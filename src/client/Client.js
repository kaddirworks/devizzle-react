import { Axios } from "axios";

const post = (url, info, client, options = {}) => {
  return client.post(url, JSON.stringify(info), {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
};

class Client {
  constructor(accessToken) {
    this.axios = new Axios({
      baseURL: import.meta.env["VITE_API_SERVER_ADDRESS"],
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }

  async authActivate(secretCode) {
    return (await this.axios.get("/auth/activate/" + secretCode)).data;
  }

  async authRegister(info) {
    return JSON.parse((await post("/auth/register", info, this.axios)).data);
  }

  async authLogin(form) {
    return JSON.parse((await this.axios.postForm("/auth/login", form)).data);
  }

  async bottlesSend(info) {
    return JSON.parse((await post("/bottles/send", info, this.axios)).data);
  }

  async bottlesReceive() {
    let data = (await this.axios.get("/bottles/receive")).data;
    if (data) {
      return JSON.parse(data);
    }
    return {};
  }

  async bottlesRespond(info) {
    return JSON.parse((await post("/bottles/respond", info, this.axios)).data);
  }

  async bottlesReport(conversationId) {
    return JSON.parse(
      (await post("/bottles/report/" + conversationId, {}, this.axios)).data
    );
  }

  async bottlesGetMyMessages(params) {
    return JSON.parse(
      (
        await this.axios.get("/bottles/my-messages", {
          params,
        })
      ).data
    );
  }

  async getProfile() {
    return JSON.parse((await this.axios.get("/bottles/profile")).data);
  }
}

export default Client;
