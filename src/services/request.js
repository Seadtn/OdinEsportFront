
import ClientServices from "./ClientServices";
import { IpAddress } from "./const";
class request {
  RegisterUser(data, type, yes) {
    let url = "http://" + IpAddress + ":8080/api/values/register?type=" + type + "&isCertificated=" + yes;
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
  getPostList() {
    let url = "http://" + IpAddress + ":8080/api/values/allPost";
    return ClientServices.getRequest(url);
  }
  AddPost(formData) {
    let url = "http://" + IpAddress + ":8080/Admin/values/addPoste";
    return ClientServices.RegisterRequest(url, formData);
  }
  getCommentList(id) {
    let url = "http://" + IpAddress + ":8080/api/values/allComment/"+id;
    return ClientServices.getRequest(url);
  }
  AddComment(formData,idPost) {
    let url = "http://" + IpAddress + ":8080/api/values/AddComment?idpost="+idPost;
    return ClientServices.RegisterRequest(url, formData);
  }
  Reagir(formData,idPost) {
    let url = "http://" + IpAddress + ":8080/api/values/Reagir?idpost="+idPost;
    return ClientServices.RegisterRequest(url, formData);
  }
  getReagirNumber(idposte) {
    let url = "http://" + IpAddress + ":8080/api/values/getAllReagir/"+idposte;
    return ClientServices.getRequest(url);
  }
  getReagir(iduser,idposte) {
    let url = "http://" + IpAddress + ":8080/api/values/getReagir/"+iduser+"/"+idposte;
    return ClientServices.getRequest(url);
  }
  getCampsList() {
    let url = "http://" + IpAddress + ":8080/api/values/allCamps";
    return ClientServices.getRequest(url);
  }
  AddCamps(formData) {
    let url = "http://" + IpAddress + ":8080/Admin/values/addCamp";
    return ClientServices.RegisterRequest(url, formData);
  }
  getTutoList() {
    let url = "http://" + IpAddress + ":8080/api/values/allTuto";
    return ClientServices.getRequest(url);
  }
  AddTuto(formData) {
    let url = "http://" + IpAddress + ":8080/Admin/values/addTuto";
    return ClientServices.RegisterRequest(url, formData);
  }
  UpdateUser(data, isChanged, state, userRole) {
    let url = "http://" + IpAddress + ":8080/api/values/UpdateUser?isCertificated=" + state + "&imageChanged=" + isChanged + "&type=" + userRole;
    return ClientServices.RegisterRequest(url, data);
  }
  ChangeStateCertificates(id,state,cmpt) {
    let url = "http://" + IpAddress + ":8080/Admin/values/UpdateState?iduser="+id+"&state="+state+"&type="+cmpt;
    return ClientServices.UpdateUser(url);
  }
  DeleteComment(idComment) {
    let url = "http://" + IpAddress + ":8080/api/values/DeleteComment?idcomment=" + idComment ;
    return ClientServices.DeleteRequest(url);
  }
}
export default new request();
