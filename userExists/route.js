export async function POST(req){
    try {
        await connectMongoDB();
        const {email} =await req.json();
        await User.findOne({email}).select("_id");
        console.log("user:", user);
        return NextRsponse.json({user});
    } catch (error) {
        console.log(error);
    }
}