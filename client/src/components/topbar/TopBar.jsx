import { Link } from "react-router-dom";
import "./topbar.css";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import { UpdateSearch } from "../../context/Action";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const PF = "http://localhost:3000/images/";
  const actionLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const darkMode = () => {
    document.body.classList.toggle("dark");
  };
  const searchPost = (e) => {
    dispatch(UpdateSearch(e.target.value));
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-x-twitter"></i>
        <i className="topIcon fa-brands fa-youtube"></i>
      </div>
      <div className="topLeftButton">
        <button className="darkButton" onClick={darkMode}>
          {document.body.classList.contains("dark")
            ? "Light Mode"
            : "Dark Mode"}
        </button>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              ACCUEIL
            </Link>
          </li>
          <li className="topListItem">
            {" "}
            <Link to="/" className="link">
              POST
            </Link>
          </li>
          <li className="topListItem">
            {" "}
            <Link to="/" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            {" "}
            <Link to="/write" className="link">
              PUBLIER
            </Link>
          </li>
          <li className="topListItem" onClick={actionLogout}>
            {user && "DECONNEXION"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/setting">
            <img className="topImg" src={PF + user.profilePicture} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                Connection
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                S'inscrire
              </Link>
            </li>
          </ul>
        )}

        <i
          className="topSearchIcon fas fa-search"
          onClick={() => setSearchIsActive(!searchIsActive)}
        ></i>
        {searchIsActive && (
          <div className="topSearch">
            <input
              className="topSearchInput"
              type="text"
              placeholder="Rechercher..."
              onChange={(e) => searchPost(e)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
