import OtherPost from "../otherPost/OtherPost";
import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      {post && post.length > 0 ? (
        post.map((p) => <OtherPost post={p} key={p._id} />)
      ) : (
        <p>Aucun message à afficher pour le moment.</p>
      )}
    </div>
  );
}
