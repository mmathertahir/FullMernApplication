const User=require('../../models/user')
const jwt= require('jsonwebtoken')
const {genrateAccessToken}=require('../../controller/genrateToken')
const refreshTokenHandler=async(req,res)=>{
    const refreshToken=req.cookies.jwt
    
    console.log(refreshToken);
    
    if(refreshToken){
        const result=await User.findOne({ refreshToken })
        console.log(result);
        if(result){
            try {
                const verify=jwt.verify(refreshToken,process.env.REFRESH_TOKEN)
                console.log(verify);
                if(verify){
                   req.user=await User.findById({_id:verify.id}).select('-password').select('-refreshToken')
                   const newAccessToken=genrateAccessToken(verify.id,verify.isAdmin)
                   res.status(201)
                   res.json({
                    token:newAccessToken,
                   });
    
                }
                if(!verify){
                    res.clearCookie('jwt',{httpOnly:true})
                    res.status(401)
                    res.send('User not authroized')
                    return;
                }
                
            } catch (error) {
                res.status(500)
                res.send(error.message)
                
            }
        }
        if(!result){
            res.status(401)
            res.send('You are not to do that')
            return;

        }



    }
    if(!refreshToken){
        res.status(401)
        res.send('User not authroized')
        return

    }

}

module.exports={refreshTokenHandler}