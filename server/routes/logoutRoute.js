const router=require('express').Router()
const {logoutHandler}=require('../routesHandler/auth/logoutHandler')


router.get('/logout', logoutHandler)



module.exports=router