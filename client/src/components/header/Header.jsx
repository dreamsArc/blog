import "./header.css";

export default function Header() {
  const PF = "http://localhost:3000/images/";
  return (
    <div className="header">
      <div className="headerTitle">
        <span className="headerTitleSm">Dream Arc Blog</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImg" src={PF + "header.png"} alt="" />
    </div>
  );
}
