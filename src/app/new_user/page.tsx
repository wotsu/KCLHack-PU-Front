"use client"
import Link from "next/link"
import { useState } from "react"
import { LoginUser } from "../data_type"
import { useRouter } from "next/navigation";

export default function CreateUserForm() {

    const router = useRouter();

    const [content, setContent] = useState<LoginUser>({
        name: "",
        password: ""
    });

    const createUser = async() => {

        if(content.name===""){
            alert("新規ユーザー名を入力してください");
            return;
        }

        if(content.password===""){
            alert("新規パスワードを入力してください");
            return;
        }

        try{

            const response = await fetch("http://localhost:8080/create/user", {
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

                console.log("ユーザー作成をしました");
                alert("ユーザーを作成しました");

                router.push('/login');
            }else{
                console.error(response.statusText, data.message);
            }

        }catch(error){
            console.log(error);
        }
    }

  return (

    <>
    <div className="login-field">
        <h1>サインアップ</h1>
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

        <div className="login-button2" onClick={createUser}>サインアップ</div>
    </div>
    </>

  )

}