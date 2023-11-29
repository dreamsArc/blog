import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const [lastPost, setLastPost] = useState({});
  const PF = "http://localhost:3000/images/";

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCats(res.data);
    };
    const getLastPost = async () => {
      const res = await axios.get("http://localhost:3000/api/posts", {
        createdAt: 1,
      });
      setLastPost(res.data[0]);
    };

    getLastPost();
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">A propos</span>
        {lastPost?.photo && (
          <img
            className="sidebarImg"
            src={PF + lastPost.photo}
            alt={lastPost.title}
          />
        )}

        <p>
          {lastPost.description && lastPost.description.length > 100
            ? () => lastPost.description.substring(0, 100) + "..."
            : lastPost.description}
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Suivez nous</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>

          <i className="sidebarIcon fa-brands fa-square-x-twitter"></i>
          <i className="sidebarIcon fa-brands fa-youtube"></i>
        </div>
      </div>
    </div>
  );
}
