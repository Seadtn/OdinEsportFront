import axios from 'axios';
class ClientService {
  async getRequest(url) {
    let data = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json;
      })
      .catch((err) => {
        console.log("BDD error", err);
      });
    return data;
  }
  async postRequest(url, object) {
    let data = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((err) => {
        console.log("BDD error", err);
      });

    return data;
  }
  //Register Request
  async RegisterRequest(url, formData) {
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async DeleteRequest(url, object) {
    let data = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((err) => {
        console.log("BDD error", err);
      });

    return data;
  }
}
export default new ClientService();
