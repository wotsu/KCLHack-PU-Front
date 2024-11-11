"use client"
import Link from "next/link"
import { useState } from "react"
import { LoginUser } from "../data_type"
import { useRouter } from "next/navigation";

// やること
// 新規ユーザーの作成

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

    <h1>新規ユーザー作成ページ</h1>

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

    <button onClick={createUser}>ユーザーを作成する</button>

    <Link href="/">投稿一覧ページに戻る</Link>
    </>

  )

}