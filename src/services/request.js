
import ClientServices from "./ClientServices";
import { IpAddress } from "./const";
class request {
  RegisterUser(data,type) {
    let url = "http://" + IpAddress + ":8080/api/values/register?type="+type;
    return ClientServices.RegisterRequest(url, data);
  }

  LoginUser(data) {
    let url = "http://" + IpAddress + ":8080/api/values/login";
    return ClientServices.postRequest(url, data);
  }
}
export default new request();
