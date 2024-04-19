const asyncHandler = require("express-async-handler");
const stripe = require('stripe')('sk_test_51P67ZWSEwxHg0JTlSOdMmCTB86S82bpVeSpRspP99FTFbAmqq4zqGhTPaKhBvAd5E9YIQ1VfgJrOFg78CfPuXtYX00PtCbsdzq');


const cartHandler=asyncHandler(async(req,res)=>{

    const products=req.body

})