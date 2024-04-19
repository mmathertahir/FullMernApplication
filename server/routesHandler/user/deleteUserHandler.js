
const User=require('../../models/user')
const deleteUser=async(req,res)=>{

    const existUser=await User.findById(req.params.id)
    if(existUser){
     try {
         await User.findByIdAndRemove(req.params.id)
        res.status(200)
        res.send('User deleted ')
        
     } catch (error) {
        res.status(400)
        throw new Error('Something Wrong ')
     }
    }
    res.status(400)
        throw new Error('user not found')




}
module.exports={deleteUser}