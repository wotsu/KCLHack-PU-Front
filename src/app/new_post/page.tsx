"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { NewPost } from "../data_type"
import { useRouter } from "next/navigation";

export default function NewPostForm() {

    const router = useRouter();

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
                alert("投稿成功");
                router.push('/');
            }else{
                console.error(response.statusText, data.message);
            }

        }catch(error){
            console.log(error);
        }
    }

  return (

    <>

    <h1>投稿ページ</h1>

    <input
        type="text"
        value={content.task}
        onChange={(e) => setContent({...content, task: e.target.value})}
        placeholder="やることを入力してください"
    />
    <input
        type="number"
        value={content.importance}
        onChange={(e) => setContent({...content, importance: Number(e.target.value)})}
        placeholder="重要度を入力してください"
    />
    <input
        type="text"
        value={content.deadline}
        onChange={(e) => setContent({...content, deadline: e.target.value})}
        placeholder="締め切りを入力してください"
    />

    <button onClick={submitPost}>ポストを作成する</button>
    <Link href="/">元の画面に戻る</Link>
    </>

  )


}