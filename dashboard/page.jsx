"use client";
import { destroyCookie,parseCookies } from 'nookies';
//import { signOut } from "next-auth/react";

const logout=()=>{
destroyCookie(null,'authToken',{path:'/'});
window.location.href='/';
}
export default function dashboard() {
    const cookies=parseCookies();
    const name=cookies.name;
    const email=cookies.email;
    
return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>Name: <span id="name" className="font-bold">{name}</span></div>
        <div>Email: <span id="email" className="font-bold">{email}</span></div> 
        <button onClick={() => logout()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">Log Out</button>
      </div>
    </div>
);}