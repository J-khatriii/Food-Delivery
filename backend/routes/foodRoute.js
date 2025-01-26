import express from "express";
import { addFood, listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer"; //images storing system

const foodRouter = express.Router();

//imges storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(request,file,callBack)=>{
        return callBack(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add", upload.single("image"),addFood);
//use post for send the data to server

foodRouter.get("/list",listFood)

foodRouter.post("/remove",removeFood)


export default foodRouter;