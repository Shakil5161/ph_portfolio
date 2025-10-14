import { FieldValues } from "react-hook-form";

export const login = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if(!res?.ok){
        console.error("User Login Failed", await res.text());
    }
    console.log(res, 'login res')
    return await res.json();
}