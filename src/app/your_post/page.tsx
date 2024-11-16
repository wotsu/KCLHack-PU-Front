"use client"
import { useState, useEffect } from "react"
import {Post} from "../data_type"

export default function UserPost() {

  const [posts, setPosts] = useState<Post[]>([])
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    const storedToken = String(localStorage.getItem("token"));
    setToken(storedToken);
  }, []);

  const fetchPosts = async() => {
    
    try {
      console.log("データ取得中");
      const response = await fetch(
        "http://localhost:8080/auth/get/posts/specific_user", {
          mode: "cors", 
          headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token || ""}`
          }
        }
      );
      console.log(response);
      const data = await response.json();
      console.log("API response", data);
      console.log(posts);

      if(Array.isArray(data)){
        setPosts(data);
      }else{
        console.error("API responce is not an array");
        alert("ログインしてください");
        setPosts([]);
      }
    } catch (error) {
      console.log(error);
      console.log("データ取得エラー");
      console.log(posts);
      alert("データ取得時にエラーが発生しました")
      setPosts([]);
    }
  
  }

  return (

    <>

      <h1>自分のやること</h1>
      <button onClick={fetchPosts}>投稿されたポストの更新</button>
      {posts.length>0 ? (
        posts.map((item: any) => (
          <div key={item.id}>
            <div>投稿ID: {item.id}</div>
            <div>ユーザーネーム: {item.user_name}</div>
            <div>やること: {item.task}</div>
            <div>重要度: {item.importance}</div>
            <br />
          </div>
        ))
      ) : (
        <p>投稿ががありません</p>
      )}

    </>
    
  );
}
