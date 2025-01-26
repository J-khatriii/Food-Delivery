import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://jaswantkhatri:it%27sjkhere@cluster0.vwfgs.mongodb.net/food_delivery').then(()=>console.log("DB connected"));
}