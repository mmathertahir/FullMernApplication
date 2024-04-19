const mongoose=require('mongoose')

const dbConnect= async()=>{
try {
    const con=await mongoose.connect(process.env.MONGO_URL)
    console.log('connected db');
    // console.log(`mongodb connected ${con.connection.host}`);
    
} catch (error) {

    console.log(error);
    
}
}

module.exports=dbConnect