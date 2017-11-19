class API {
  constructor(url) {
    this.url = url;
    this.config = {
      headers: new Headers({ "Content-Type": "application/json" })
    }
  }

  async post(path, payload) {
    const opts = Object.assign({
      method: 'POST',
      body: JSON.stringify(payload)
    }, this.config);

    const res = await window.fetch(this.url + path, opts);
    return res.json();
  }
}

export default new API(process.env.REACT_APP_API_URL);
