import "./otherPost.css";
import { Link } from "react-router-dom";

export default function OtherPost({ post }) {
  const PF = "http://localhost:3000/images/";
  return (
    <div className="otherPost">
      {post?.photo !== "" && (
        <img className="otherPostImg" src={PF + post.photo} alt="" />
      )}
      <hr />

      <div className="postInfo">
        <div className="postCat">
          {post.categories.map((c) => (
            <span className="postCats" key={c}>
              {c}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.description}</p>
    </div>
  );
}
