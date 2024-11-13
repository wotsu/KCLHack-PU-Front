"use client"
import Link from "next/link"
import { useState } from "react"
import { LoginUser } from "../data_type"
import { useRouter } from "next/navigation";

// やること
// 新規ユーザーの作成

export default function LoginForm() {

    const router = useRouter();

    const [content, setContent] = useState<LoginUser>({
        name: "",
        password: ""
    });

    const userLogin = async() => {

        if(content.name===""){
            alert("ユーザー名を入力してください");
            return;
        }

        if(content.password===""){
            alert("パスワードを入力してください");
            return;
        }

        try{

            const response = await fetch("http://localhost:8080/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                }, 
                body: JSON.stringify({
                    name: content.name, 
                    password: content.password
                }), 
            });
            const data = await response.json();
            if(response.ok){
                
                setContent({
                    name: "", 
                    password: ""
                });

                localStorage.setItem("token", data.token);
                console.log(data.token);
                console.log("ログインしました");
                alert("ログインしました");

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

    <h1>ログインページ</h1>

    <input
        type="text"
        value={content.name}
        onChange={(e) => setContent({...content, name: e.target.value})}
        placeholder="ユーザー名を入力してください"
    />
    <input
        type="text"
        value={content.password}
        onChange={(e) => setContent({...content, password: e.target.value})}
        placeholder="パスワードを入力してください"
    />

    <button onClick={userLogin}>ログイン</button>

    <Link href="/new_user">新しくアカウントを作成する方はこちらをクリック</Link>
    <Link href="/">投稿一覧ページに戻る</Link>
    </>

  )


}