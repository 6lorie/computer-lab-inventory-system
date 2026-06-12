import api from "./api";

interface LoginData {
    username: string;
    password: string;
}

export async function login(
    data: LoginData
) 
{
    const res = await api.post("/auth/login", data);

    return res.data;
}