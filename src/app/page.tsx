"use client"
import { useState } from "react"
import {Post} from "./data_type"
import Link from "next/link"

export default function Home() {

  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async() => {
    
    try {
      console.log("データ取得中");
      const response = await fetch(
        "http://localhost:8080/get/posts", {
          mode: "cors"
        }
      );
      console.log(response);
      const data = await response.json();
      console.log("API response", data);
  
      setPosts(data);
      return data;
    } catch (error) {
      console.log(error);
      console.log("データ取得エラー");
    }
  
  }

  return (

    <>

      <Link href="/login">ログイン</Link>
      <Link href="/new_post">新規投稿作成</Link>

      <h1>みんなのやること</h1>
      <button onClick={fetchPosts}>投稿されたポストの更新</button>
      {posts ? (
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
