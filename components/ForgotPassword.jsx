export default function forgotpassword() {
    const [email, setemail] = useState("");
    const [error, seterror] = useState("");
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const res=await axios.put('https://api.dev2.constructn.ai/api/v1/users/signin/reset-password-init',{"email":email});
            if(res.data.success==="true"){
                window.location.href='/';
            }
            else{
                seterror("Invalid email");
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3" autoComplete="off">
            <input onChange={(e)=>setemail(e.target.value)}  type="text" placeholder="Email" autoComplete="new-Email" />
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"> Reset Password</button>
        </form>
    );     
}
