import { Image } from "react-bootstrap";
import request from "../../../services/request";

function Comment(idComment, text, user, date, data) {
  let x = text;
  const calculateDateDifference = (d) => {
    let dateParts = d.split("/");
    let formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
    let startDateTime = new Date(formattedDate);
    let diffInMilliSeconds = Math.floor(new Date() - startDateTime);
    let days = Math.floor(diffInMilliSeconds / (1000 * 60 * 60 * 24));
    if (days == 0) {
      return `Today`;
    } else if (days > 0 && days < 15) {
      if (days == 1) {
        return `1 day`;
      } else {
        return `${days} days`;
      }
    } else if (days == 30) {
      return `1 month`;
    } else if (days >= 30) {
      return `${Math.floor(days / 30)} months`;
    } else if (days == 360) {
      return `1 year`;
    } else if (days > 360) {
      return `${Math.floor(days / 360)} years`;
    }
  };
  function deleteComment(id) {
    request.DeleteComment(id);
    window.location.reload();
  }
  function modify(id) {
    let te = document.getElementById("comment" + id);
    te.classList.add("d-none");
    let modifyText = document.getElementById("modifyComment" + id);
    modifyText.classList.remove("d-none");
    let buttonModify = document.getElementById("ModifyButton" + id);
    buttonModify.classList.add("d-none");
    let buttonUnmodify = document.getElementById("UnmodifyButton" + id);
    buttonUnmodify.classList.remove("d-none");
  }
  function unmodify(id, newText) {
    if(newText==""){ 
      newText=text;
    }
    let te = document.getElementById("comment" + id);
    te.classList.remove("d-none");
    let modifyText = document.getElementById("modifyComment" + id);
    modifyText.classList.add("d-none");
    let buttonModify = document.getElementById("ModifyButton" + id);
    buttonModify.classList.remove("d-none");
    let buttonUnmodify = document.getElementById("UnmodifyButton" + id);
    buttonUnmodify.classList.add("d-none");
    request.UpdateComment(id, newText).then((result) => console.log(result));
  }
  return (
    <li className="mb-2">
      <div className="d-flex">
        <Image
          src={"data:image/*;base64, " + user.profileImage}
          alt="userimg"
          className="avatar-50   p-1 pt-2 bg-soft-primary rounded-pill img-fluid"
        />
        <div className="ms-3">
          <h6 className="mb-1">{user.firstName + " " + user.lastName}</h6>
          <p id={"comment" + idComment} className="mb-1">
            {text}
          </p>
          <input
            id={"modifyComment" + idComment}
            className="mb-1 form-control d-none"
            //value={x}
            onChange={(e) => (x = e.target.value)}
          />
          <div className="d-flex flex-wrap align-items-center mb-1">
            {(user.id == data.id || data.userRole == "Admin") && (
              <a
                href=""
                onClick={() => deleteComment(idComment)}
                className="me-3 text-primary "
              >
                Delete
              </a>
            )}
            {user.id == data.id && (
              <a
                id={"ModifyButton" + idComment}
                onClick={() => modify(idComment)}
                className="me-3 text-primary "
              >
                Modify
              </a>
            )}
            {user.id == data.id && (
              <a
                href=""
                id={"UnmodifyButton" + idComment}
                onClick={() => unmodify(idComment, x)}
                className="me-3 text-primary d-none"
              >
                Save
              </a>
            )}
            <span>{calculateDateDifference(date)} </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Comment;
