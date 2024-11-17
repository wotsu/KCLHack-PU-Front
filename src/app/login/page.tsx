"use client"
import Link from "next/link"
import { useState } from "react"
import { LoginUser } from "../data_type"
import { useRouter } from "next/navigation"
import "../globals.css"

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
                alert("ログインに失敗しました\nユーザー名またはパスワードが間違えています");
            }

        }catch(error){
            console.log(error);
        }
    }

  return (

    <>
    <div className="login-field">
        <h1>ログイン</h1>
        <br></br>
        <label>ユーザー名</label>
        <input
            className="user-name"
            type="text"
            value={content.name}
            onChange={(e) => setContent({...content, name: e.target.value})}
            placeholder="ユーザー名を入力してください"
        />
        <label>パスワード</label>
        <input
            className="password"
            type="text"
            value={content.password}
            onChange={(e) => setContent({...content, password: e.target.value})}
            placeholder="パスワードを入力してください"
        />

        <div className="login-button2" onClick={userLogin}>ログイン</div>

        <Link href="/new_user" className="signup">サインアップはこちらから</Link>
    </div>
    </>

  )


}