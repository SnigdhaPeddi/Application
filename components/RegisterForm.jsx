"use client";
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function RegisterForm() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError]=useState("");

  const router=useRouter();


  const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
    //! API call for user registration using axios
    const response = await axios.post("https://api.dev2.constructn.ai/api/v1/users/register",
    {'firstName':name,"lastName":name,'email':email,'password':password});
  //   if (response.ok) {
  //     const form = e.target;
  //     form.reset();
  // }
    if (response.status === 201 || response.status === 200) {
      //! If registration is successful, you can redirect or perform any other actions
      console.log("Registration successful:");
      console.log(response.data);
      window.alert("Signup successful!");
      router.push("/");
      } else {
        //! Handle other non-successful status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
  }
    catch (error) {
        //! Check if it's an Axios error with a response
        if (axios.isAxiosError(error) && error.response) {
          const responseData = error.response.data;
          if (error.response.status === 409) {
            console.log("Email address already registered");
            console.log("Server message:", responseData.message);
            window.alert(`Email Already Exists: ${responseData.message}`);
          } else {
            //! Handle other non-successful status codes
            console.error("Registration error:", error);
            window.alert("Registration failed. Please try again later.");
          }
        } else {
          //! Handle other types of errors
          console.error("Registration error:", error);
          window.alert("Registration failed. Please try again later.");
        }
      }
    
  };
  return (
    <div className="grid place-items-center h-screen">Registration Form
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 ">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3" autoComplete="off">
            <input onChange={(e)=> setname(e.target.value)} type="text" placeholder="Full Name" autoComplete="new-Full-Name" />
            <input onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Email" autoComplete="new-Email" />
            <input onChange={(e)=> setPassword(e.target.value)}type="password" placeholder="Password" autoComplete="new-password" />
            <input onChange={(e)=> setPassword(e.target.value)}type="password" placeholder="Confirm Password" autoComplete="new-password"/>
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"> Register</button>
            {error && (<div className="bg-red-500 text-white text-sm w-fit py-1 px-3 rounded-md mt-2">{error}</div>)}
            <Link className="text-sm mt-3 text-right" href={'/'}>Already have an account?<span className="underline">Login</span></Link>
        </form>
        </div>
    </div>
  );
}