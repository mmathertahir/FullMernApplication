const mongoose=require('mongoose')


const productSchema=mongoose.Schema(
{
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User
    },

    title:{
        type:String,
        required:[true,'Product title is required'],
        
    },
    desc:{
        type:String,
        required:[true,'Product description is required'],
    },
    categery:{
        type:Array,
        required:true
    },
    price:
    {
        type:Number,
        required:[true,'Product Price is required']
    },
    imageURL:{
        type:String,
        required:[true,'Product image is required']
    },
    quantity:{
        type:Number,
        default:false

    }

},
{
    timestamps:true
}
)

module.exports=mongoose.model('Product',productSchema)