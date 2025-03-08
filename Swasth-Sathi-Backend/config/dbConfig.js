const mongoose= require("mongoose");

module.exports.dbConfig = async ()=>{
    const url = process.env.MONGO_URL;
    try{
        await mongoose.connect(url);
        console.log('database connected successfully...')
    }
    catch(error){
        console.log('an error occurred while connecting to database => ',error);
    }
} 