import { Router } from "express";
import { createPost } from "../../Controller/User/post.controller";
const router : Router = Router();
import passport from "passport";


router.post('/createPost',passport.authenticate('jwt',{session:false}), createPost );


export default router;