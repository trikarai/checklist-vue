export default {
  getAuthHeader() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const headers = {
      Authorization: "Bearer " + user.data.token
    };
    return headers;
  }
};
