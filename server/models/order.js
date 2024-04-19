const mongoose=require('mongoose')


const orderSchema=mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User
    },

    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:Product
        },
        productQuantity:{
            type:Number,
            default:1
        }

}],
amount:{
    type:Number,
    required:true
},
adress:{
    type:Object,
    required:true
},
status:{
    type:String,
    default:"pending"
}

},
{
    timestamps:true,
}
)

module.exports=mongoose.model('Cart',cartSchema)