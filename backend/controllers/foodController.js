import { model } from "mongoose";
import foodModel from "../models/foodModel.js";
import fs from "fs"
import { request } from "http";
import { resolveNaptr } from "dns";

//add food item
const addFood = async (request,response)=>{

    let image_filename = request.file ? `${request.file.filename}` : null;

    const food = new foodModel({
        name:request.body.name,
        description:request.body.description,
        price:request.body.price,
        category:request.body.category,
        image:image_filename
    });

    try{
        await food.save();
        response.json({success:true,message:"Food added"});
    }catch(error){
        console.log(error);
        response.json({success:false,message:"Error"});
    }

}

//all food list

const listFood = async(request,response)=>{
    try {
        const foods = await foodModel.find({});
        response.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        response.json({success:false,message:error});
    }
}
//remove food item
const removeFood = async(request,response)=>{
    try {
        const food = await foodModel.findById(request.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(request.body.id);

        response.json({success:true,message:"Food Removed"});
    } catch (error) {
        console.log(error)
        response.json({success:false,message:"Food Not Removed"});
    }
}

export {addFood,listFood,removeFood};