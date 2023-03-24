import { Axios } from "axios";

class Client {
  constructor(accessToken) {
    this.axios = new Axios({
      baseURL: import.meta.env["VITE_API_SERVER_ADDRESS"],
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    this.accessToken = accessToken;

    this.defaultOkHandler = this.defaultOkHandler.bind(this);
    this.defaultValidationErrorHandler =
      this.defaultValidationErrorHandler.bind(this);
    this.defaultServerErrorHandler = this.defaultServerErrorHandler.bind(this);
    this.defaultUnauthorizedErrorHandler =
      this.defaultUnauthorizedErrorHandler.bind(this);
  }

  defaultOkHandler(res, data) {
    return {
      data,
    };
  }

  defaultValidationErrorHandler(res, data) {
    return {
      error: {
        code: res.status,
        message: data.detail.msg,
      },
    };
  }

  defaultServerErrorHandler(res, data) {
    return {
      error: {
        code: 500,
        message: "Server error.",
      },
    };
  }

  defaultUnauthorizedErrorHandler(res, data) {
    return this.makeErrorResponse(401, "Invalid or deactivated user.");
  }

  async getAuthActivate(secretCode) {
    let result = await this.axios.get("/auth/activate/" + secretCode);
    let data = JSON.parse(result.data);
    let message = null;

    switch (result.status) {
      case 200:
        return {
          data,
        };

      case 400:
        message =
          "Perhaps this username or email has been already activated. Sorry.";
        break;

      case 404:
        message = "Activation code not found.";
        break;

      case 422:
        message = data.detail.msg;
        break;

      case 500:
        message = "Server error.";
        break;
    }

    return {
      error: {
        code: result.status,
        message,
      },
    };
  }

  async postAuthRegister(info) {
    let stringfied = JSON.stringify(info);
    let headers = {
      "Content-Type": "application/json",
    };
    let result = await this.axios.post("/auth/register", stringfied, {
      headers,
    });
    let data = JSON.parse(result.data);
    let message = null;

    switch (result.status) {
      case 200:
        return {
          data,
        };

      case 400:
        message = "Username or email in use.";
        break;

      case 422:
        message = data.detail.msg;
        break;

      case 500:
        message = "Server error.";
        break;
    }

    return {
      error: {
        code: result.status,
        message,
      },
    };
  }

  async postAuthLogin(form) {
    let result = await this.axios.postForm("/auth/login", form);
    let data = JSON.parse(result.data);
    let message = null;

    switch (result.status) {
      case 200:
        return {
          data,
        };

      case 400:
        message = "Invalid credentials.";
        break;

      case 401:
        message = data.detail; // Should say what happened.
        break;

      case 422:
        message = data.detail.msg;
        break;

      case 500:
        message = "Server error.";
        break;
    }

    return {
      error: {
        code: result.status,
        message,
      },
    };
  }

  useHandlerOrGetDefault(status, defaultHandler) {
    if (defaultHandler) return defaultHandler;

    switch (status) {
      case 200:
        return this.defaultOkHandler;

      case 401:
        return this.defaultUnauthorizedErrorHandler;

      case 422:
        return this.defaultValidationErrorHandler;

      case 500:
        return this.defaultServerErrorHandler;

      default:
        return defaultHandler;
    }
  }

  async handlePost(url, info, handlers) {
    let stringfied = JSON.stringify(info);
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.accessToken,
    };
    let result = await this.axios.post(url, stringfied, {
      headers,
    });
    let data = JSON.parse(result.data);
    let handler = this.useHandlerOrGetDefault(
      result.status,
      handlers[result.status]
    );

    if (handler) {
      return handler(result, data);
    }

    return null;
  }

  makeErrorResponse(code, msg) {
    return {
      error: {
        code,
        msg,
      },
    };
  }

  async postBottlesSend(info) {
    return await this.handlePost("/bottles/send", info, {});
  }

  async handleGet(url, handlers, params = {}) {
    let result = await this.axios.get(url, {
      params,
    });
    let data = result.data ? JSON.parse(result.data) : {};
    let handler = this.useHandlerOrGetDefault(
      result.status,
      handlers[result.status]
    );

    if (handler) {
      return handler(result, data);
    }

    return null;
  }

  async getBottlesReceive() {
    return await this.handleGet("/bottles/receive", {
      204: (res, data) => {
        data: [];
      },
    });
  }

  async postBottlesRespond(info) {
    return await this.handlePost("/bottles/respond", info, {});
  }

  async postBottlesReport(conversationId) {
    return await this.handlePost(
      "/bottles/report/" + conversationId,
      {},
      {
        403: "You are not participating in this conversation.",
        404: "Conversation does not exist.",
      }
    );
  }

  async getBottlesMyMessages(params) {
    return await this.handleGet("/bottles/my-messages", {}, params);
  }

  async getBottlesProfile() {
    return await this.handleGet("/bottles/profile", {});
  }
}

export default Client;
