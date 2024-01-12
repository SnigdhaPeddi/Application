"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

export default function LoginForm() {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const router=useRouter();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('https://api.dev2.constructn.ai/api/v1/users/signin', {
      email: email,
      password: password,});
      
      if (res.data && res.data.result) 
      {console.log("login");
      console.log(res.data);
      const token = res.data.result.token;
      setCookie(null, 'authToken', token, { path: '/' });
      setCookie(null,'name',res.data.result.firstName,{path:'/'});
      setCookie(null,'email',res.data.result.email,{path:'/'});
      window.location.href='/dashboard';
      } else {
      seterror("Invalid credentials");}
      } catch (error) {
      console.log("Error during login", error);
      //seterror("Invalid password or network issues");
      }
    };
    
  return (
    <div className="grid place-items-center h-screen">Login Form
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3" autoComplete="off">
            <input onChange={(e)=>setemail(e.target.value)}  type="text" placeholder="Email" autoComplete="new-Email" />
            <input onChange={(e)=>setpassword(e.target.value)}  type="password" placeholder="Password" autoComplete="new-Password"/>
            <Link className="text-sm mt-3 text-left" href={'/forgotpassword'}><span className="underline">Forgot Password?</span></Link>
            
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"> Login</button>
            {error && (<div className="bg-red-500 text-white text-sm w-fit py-1 px-3 rounded-md mt-2">{error}</div>)}
            <Link className="text-sm mt-3 text-right" href={'/register'}>Don't have an account?<span className="underline">Register</span></Link>
        </form>
        </div>
    </div>
    
  );
}

