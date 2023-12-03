
import ClientServices from "./ClientServices";
import { IpAddress } from "./const";
class request {
  RegisterUser(data,type,yes) {
    let url = "http://" + IpAddress + ":8080/api/values/register?type="+type + "&isCertificated="+yes;
    return ClientServices.RegisterRequest(url, data);
  }

  LoginUser(data) {
    let url = "http://" + IpAddress + ":8080/api/values/login";
    return ClientServices.postRequest(url, data);
  }

  getAgentsList() {
    let url = "http://" + IpAddress + ":8080/api/values/allAgent";
    return ClientServices.getRequest(url);
  }

  getFootballersList() {
    let url = "http://" + IpAddress + ":8080/api/values/allFootballer";
    return ClientServices.getRequest(url);
  }
  
}
export default new request();
