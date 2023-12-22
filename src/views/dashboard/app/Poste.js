import { useEffect, useState } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import avatars2 from "../../../assets/images/avatars/favicon.ico";
import Card from "../../../components/Card";
import ShareOffcanvas from "../../../components/partials/components/shareoffcanvas";
import request from "../../../services/request";
import Comment from "./Comment";
function Poste(props) {
  const { post, image, text, date } = props;
  const { isLoggedIn, data } = useSelector((state) => state.data.user);
  const [Commenttext, setCommenttext] = useState("");
  const [ListComment, setListComment] = useState([]);
  const [reagirnumber, setreagirnumber] = useState(0);
  const [reagirState, setreagirState] = useState(false);
  const calculateDateDifference = (d) => {
    const dateParts = d.split("/");
    const formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
    const startDateTime = new Date(formattedDate);
    const diffInMilliSeconds = Math.floor(new Date() - startDateTime);
    const days = Math.floor(diffInMilliSeconds / (1000 * 60 * 60 * 24));
    if (days == 0) {
      return `Today`;
    } else if (days > 0 && days < 15) {
      if (days == 1) {
        return `${days} day`;
      } else {
        return `${days} days`;
      }
    } else {
      return `${formattedDate}`;
    }
  };
  function getAllComments() {
    request.getCommentList(post).then((result) => {
      setListComment(result);
    });
  }
  function getReagirPost() {
    request.getReagirNumber(post).then((result) => {
      setreagirnumber(result.length);
      getReagirByUserandPost();
    });
  }
  useEffect(() => {
    getAllComments();
    getReagirPost();
  }, []);

  async function AddComment() {
    if (Comment != "" && Comment != null) {
      const form = new FormData();
      form.append("user", JSON.stringify(data));
      form.append("type", data.userRole);
      form.append("text", Commenttext);
      form.append("date", new Date().toLocaleDateString());
      setCommenttext("");
      request.AddComment(form, post).then((result) => {
        setCommenttext("");
        getAllComments();
      });
    }
  }
  async function Reagirr() {
    const form = new FormData();
    form.append("user", JSON.stringify(data));
    form.append("type", data.userRole);
    request.Reagir(form, post).then((result) => {
      getReagirPost();
      getReagirByUserandPost();
    });
  }
  function getReagirByUserandPost() {
    request.getReagir(data.id, post).then((result) => {
      if (result != null && result != undefined) {
        setreagirState(true);
      } else {
        setreagirState(false);
      }
    });
  }
  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-between pb-4">
        <div className="header-title">
          <div className="d-flex flex-wrap">
            <div className="media-support-user-img me-3">
              <Image
                className=" img-fluid avatar-60  p-1 ps-2  "
                src={avatars2}
                alt=""
              />
            </div>
            <div className="media-support-info mt-2">
              <h5 className="mb-0">Odin Esport</h5>
              <p className="mb-0 text-primary">Official Web site</p>
            </div>
          </div>
        </div>
        <Dropdown>
          <Dropdown.Toggle as="span" aria-expanded="false" role="text">
            {calculateDateDifference(date)}
          </Dropdown.Toggle>
        </Dropdown>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="user-post">
          <Image
            src={"data:image/*;base64, " + image}
            alt="post-image"
            className="img-fluid"
          />
        </div>
        <div className="comment-area p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center message-icon me-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  onClick={() => Reagirr()}
                >
                  <path
                    fill={reagirState ? "red" : "gray"}
                    d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                  />
                </svg>
                <span className="ms-1">{reagirnumber}</span>
              </div>
              <div className="d-flex align-items-center feather-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"
                  />
                </svg>
                <span className="ms-1">{ListComment.length}</span>
              </div>
            </div>
            <div className="share-block d-flex align-items-center feather-icon">
              <ShareOffcanvas />
            </div>
          </div>
          <hr />
          <p>{text}</p>
          <hr />
          <ul className="list-inline p-0 m-0">
            {ListComment != undefined &&
              ListComment.map((comment) => {
                return Comment(
                  comment.id,
                  comment.text,
                  comment.user,
                  comment.date,
                  data
                );
              })}
          </ul>
          <form
            className="comment-text d-flex align-items-center mt-3"
            action=""
          >
            <input
              type="text"
              className="rounded form-control "
              placeholder="Add Comment..."
              value={Commenttext}
              onChange={(e) => setCommenttext(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  AddComment();
                }
              }}
            />
            <div className=" d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                onClick={() => AddComment()}
              >
                <path d="M15.379,19.1403 L12.108,12.5993 L19.467,5.2413 L15.379,19.1403 Z M4.86,8.6213 L18.76,4.5343 L11.401,11.8923 L4.86,8.6213 Z M3.359,8.0213 C2.923,8.1493 2.87,8.7443 3.276,8.9483 L11.128,12.8733 L15.053,20.7243 C15.256,21.1303 15.852,21.0773 15.98,20.6413 L20.98,3.6413 C21.091,3.2623 20.739,2.9093 20.359,3.0213 L3.359,8.0213 Z" />
              </svg>
            </div>
          </form>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Poste;
