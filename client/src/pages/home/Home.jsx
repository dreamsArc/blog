import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Post from "../../components/posts/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Home() {
  const [post, setPosts] = useState([]);
  const { search } = useLocation();
  const { searchPost } = useContext(Context);

  let newSearch = "?search=" + searchPost;
  useEffect(() => {
    const fetchPostsHandler = async () => {
      await axios
        .get("http://localhost:3000/api/posts" + search)
        .then((res) => {
          setPosts(res.data);
        });
    };
    const fetchPostsSearch = async () => {
      await axios
        .get("http://localhost:3000/api/posts" + newSearch)
        .then((res) => {
          setPosts(res.data);
        });
    };
    const fetchPosts = async () => {
      await axios.get("http://localhost:3000/api/posts").then((res) => {
        setPosts(res.data);
      });
    };
    if (newSearch !== "?search=") {
      fetchPostsSearch();
    } else if (search) {
      fetchPostsHandler();
    } else {
      fetchPosts();
    }
  }, [newSearch, search]);
  return (
    <>
      <Header />
      <div className="home">
        <Post post={post} />
        <Sidebar />
      </div>
    </>
  );
}
