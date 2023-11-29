import "./login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { LoginStart, LoginSuccess } from "../../context/Action";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const modSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        },
        { withCredentials: true }
      );
      dispatch(LoginSuccess(res.data));
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Connexion</span>
      <form className="loginForm" onSubmit={modSubmit}>
        <label>Nom de profile</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Entrer votre nom utilisateur..."
          ref={userRef}
        />

        <label>Mot de passe</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Entrer votre mot de passe..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Se connecter
        </button>
      </form>

      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          S'inscrire
        </Link>
      </button>
    </div>
  );
}
