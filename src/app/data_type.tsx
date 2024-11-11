export interface User{

    id: any;
    name: any;
    password: any;
    created_at: any;
    updated_at: any;

}

export interface LoginUser{

    name: any;
    password: any;

}

export interface Post{

    id: any;
    user_name: any;
    task: any;
    importance: any;
    deadline: any;
    created_at: any;
    updated_at: any;

}

export interface NewPost{

    task: any;
    importance: any;
    deadline: any;

}