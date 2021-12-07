import { PostModel } from "../../Models/User/post.model";


export const createPost = async(req,res,next) => {

    try
    {
        if(req.body.postImage && req.body.text)
        {
            let {postImage, text} = req.body;

            const postDocument = new PostModel({postImage, text});

            const saveData = await postDocument.save();

            if(saveData)
            {
                let responseData : any = [];

                responseData.push({"Message" : "Posted Successfully"});

                responseData.push(saveData);

                return res.send(responseData)
            }
        }
        else
        {
            return res.send({Msg : "Field Validation Failed"})
        }
    }

    catch(error)
    {
        return res.send(error)
    }
}