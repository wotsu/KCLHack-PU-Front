"use client"
import { useEffect, useState } from "react"
import {Post} from "./data_type"
import { NewPost } from "./data_type"
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([])

  const [content, setContent] = useState<NewPost>({
    task: "", 
    importance: 0,
    deadline: ""
  });

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = String(localStorage.getItem("token"));
    setToken(storedToken);
  }, []);

  const fetchPosts = async() => {
    
    try {
      console.log("データ取得中");
      const response = await fetch(
        "http://localhost:8080/get/posts", {
          mode: "cors",
        }
      );
      console.log(response);
      const data = await response.json();
      console.log("API response", data);
      
    } catch (error) {
      console.log(error);
      console.log("データ取得エラー");
    }
  }

  const submitPost = async() => {

    if(content.task===""){
      alert("やることを入力してください");
      return;
    }

    if(content.deadline===""){
      alert("締め切りを入力してください");
      return;
    }

    try{
      console.log(token);
      const response = await fetch("http://localhost:8080/auth/create/post", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token || ""}`
        }, 
        body: JSON.stringify({
          task: content.task,
          importance: content.importance,
          deadline: content.deadline  
        }), 
      });
      const data = await response.json();
      if(response.ok){
        setContent({
          task: "",
          importance: 0,
          deadline: ""
        });
        console.log("投稿成功");
      }else{
        console.error(response.statusText, data.message);
      }

    }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (

    <>
      <div className="post-field">
        {posts ? (
          posts.slice(0).reverse().map((item: any) => (
            <div key={item.id} className="post">
              <div className="post-username">@{item.user_name}</div>
              <div className="post-task">　{item.task}</div>
              <div className="post-importance">重要度: {item.importance}</div>
              <br />
            </div>
          ))
        ) : (
          <p>投稿ががありません</p>
        )}
      </div>

      <div className="newpost-field">
        <label>タスク</label>
        <input
          className="task-textbox"
          type="text"
          value={content.task}
          onChange={(e) => setContent({...content, task: e.target.value})}
          placeholder="タスクを入力してください"
        />
        <label>重要度</label>
        <input
          className="importance-textbox"
          type="number"
          value={content.importance}
          onChange={(e) => setContent({...content, importance: Number(e.target.value)})}
          placeholder="重要度を入力してください"
        />
        <label>期限</label>
        <input
          className="deadline-textbox"
          type="text"
          value={content.deadline}
          onChange={(e) => setContent({...content, deadline: e.target.value})}
          placeholder="締め切りを入力してください"
        />
        <div className="post-button" onClick={submitPost}>投稿</div>
      </div>

      <div className="reload-button" onClick={fetchPosts}>↺</div>

    </>
    
  );
}
