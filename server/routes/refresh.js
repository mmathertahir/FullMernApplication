const router=require('express').Router()
const {refreshTokenHandler}=require('../routesHandler/auth/refreshTokenHandler')



router.get('/refresh',refreshTokenHandler)


module.exports=router