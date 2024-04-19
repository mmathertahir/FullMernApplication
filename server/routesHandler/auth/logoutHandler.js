const User=require('../../models/user')
const jwt=require('jsonwebtoken')
const logoutHandler=async(req,res)=>{
const cookierefresh=req.cookies.jwt
if(cookierefresh)
{
    const decode=jwt.verify(cookierefresh,process.env.REFRESH_TOKEN)
    await User.findByIdAndUpdate(decode.id,{refreshToken:""})
    req.user=""
    res.clearCookie('jwt',{httpOnly:true})
    res.status(203)
    res.send('User logout')

    return
}
if(!cookierefresh)
{
    res.status(400)
    res.send("Access Denied")
}
}

module.exports={logoutHandler}