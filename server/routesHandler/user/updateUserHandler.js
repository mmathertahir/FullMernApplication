const User=require('../../models/user')
const updateUser=async(req,res)=>{
    const{username,email,password,phoneNo}=req.body
    if(username || email || password || phoneNo){
        try {
            const result=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}).select('-password').select('-refreshToken')
            res.status(200)
            res.json(result)
            
        } catch (error) {
            res.status(500).send(error)
            
        }
    }
    res.status(400)
    throw new Error('Something Wrong ')



}
module.exports={updateUser}