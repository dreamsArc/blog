import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./setting.css";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Setting() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:3000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("http://localhost:3000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(
        "http://localhost:3000/api/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Modifier votre compte</span>

          <span className="settingDeleteTitle">Supprimer votre compte</span>
        </div>
        <form className="settingForm" onSubmit={handleSubmit}>
          <label>Photo de profile</label>
          <div className="settingProfilePicture">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePicture}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingProfileIcon fas fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Nom de profile</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingSubmit">Modifier</button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Votre profil a été modifié...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
