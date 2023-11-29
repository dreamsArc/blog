import { useEffect, useState, useContext } from "react";
import "./singlePost.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const PF = "http://localhost:3000/images/";
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:3000/api/posts/" + path);
      setTitle(res.data.title);
      setPost(res.data);
      setDescription(res.data.description);
    };
    getPost();
  }, [path]);

  const actionDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${post._id}`, {
        data: {
          username: user.username,
        },
      });

      window.location.replace("/");
    } catch (err) {}
  };

  const actionUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/posts/${post._id}`, {
        username: user.username,
        title: title,
        description: description,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={actionDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Autheur:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singlePostDescription">{description} </p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={actionUpdate}>
            Modifier
          </button>
        )}
      </div>
    </div>
  );
}
