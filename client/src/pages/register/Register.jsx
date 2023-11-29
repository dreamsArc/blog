import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);

  const modSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });

      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">S'inscrire</span>
      <form className="registerForm" onSubmit={modSubmit}>
        <label>Nom de profile</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Entrer votre nom utilisateur..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Entrer votre Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Entrer votre mot de passe..."
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          S'inscrire
        </button>
      </form>

      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Se Connecter
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: 5 }}>
          Quelque chose c'est mal passée...
        </span>
      )}
    </div>
  );
}
