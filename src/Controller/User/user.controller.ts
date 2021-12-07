import {UserModel} from '../../Models/User/user.model';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const otpSend = async (req,res,next) => {

    try```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
    {
        if(req.body.mobileNo)
        {
            let userData = await UserModel.findOne({mobileNo : req.body.mobileNo});
            if(userData)
            {
                return res.send({Msg : "Mobile number was already registered"})
            }
            else
            {
                let reqData = {
                    mobileNo : req.body.mobileNo,
                    otp : 1031
                };
    
                const userDocument = new UserModel(reqData);
    
                const saveData = await userDocument.save();
    
                if(saveData)
                {
                    return res.send(saveData);
                }
            }


        }
        else
        {
            return res.send({Msg : "Mobile number is required"})
        }
    }

    catch(error)
    {
        return res.send(error);
    }
}

export const otpVerification = async (req,res,next) => {

    try
    {
        if(req.body.otp && req.body.mobileNo)
        {
            let userData : any = await UserModel.findOne({mobileNo : req.body.mobileNo});

            if(userData)
            {
                if(userData.otp == req.body.otp)
                {
                    const updateUserData = await UserModel.findOneAndUpdate(
                        {_id : userData._id},
                        {
                            $set : {
                                otpVerified : true
                            }
                        },
                        {
                            new : true
                        }
                    );

                    if(updateUserData)
                    {
                        let responseData : any = [];
                        responseData.push(updateUserData);
                        responseData.push({"Message": "OTP verified successfully"});
                        return res.send(responseData);
                    }
                }
                else
                {
                    return res.send({Msg : "Invalid OTP"})
                }
            }
            else
            {
                return res.send({Msg : "Invalid Mobile Number"})
            }

        }
        else
        {
            return res.send({Msg : "MobileNumber and OTP is required"})
        }

    }

    catch(error) 
    {
        return res.send(error)
    }
}

export const signup = async (req,res,next) => {
    try
    {
        if(req.body.name && req.body.password && req.body.image && req.body.mobileNo)
        {
            let {name,password,image,mobileNo} = req.body;
            console.log({name,image,password,mobileNo});
            let getUserDetails : any = await UserModel.findOne({mobileNo}).exec();
            if(getUserDetails)
            {
                console.log(getUserDetails);
                console.log(getUserDetails.otpVerified);
                if(getUserDetails.otpVerified === true)
                {
                    if(password !== null || password !== undefined || password !== '')
                    {
                        const salt = await bcryptjs.genSalt();
                        const hash = await bcryptjs.hash(password,salt);

                        password = hash;
                    }

                    const secret = "ASDFGHJKL";

                    const token = jwt.sign({id:getUserDetails._id},secret,{expiresIn:'1d'});

                    let updateData = await UserModel.findOneAndUpdate(
                        {_id : getUserDetails._id},
                        {
                            $set : {
                                name, password, image, token
                            }
                        },
                        {new : true}
                    );

                    if(updateData)
                    {
                        let responseData : any = [];
                        responseData.push({"Message":"Registered successfully"});
                        responseData.push(updateData)
                        return res.send(responseData);
                    }
                }
                else
                {
                    return res.send({Msg : 'Mobile number is not verified'})
                }
            }
            else
            {
                return res.send({Msg : 'Mobile number is Invalid'});

            } 
        }
        else
        {
            return res.send({Msg : "Field Validation Failed"})
        }
    }

    catch(err)
    {
        console.error(err);
        return res.send(err);
    }
}

// export const login = async (req,res,next) => {

//     try
//     {
//        let {mobileNo,password} = req.body;

//        const userInfo = await UserModel.findOne({name}).exec();

//        if(userInfo)
//        {
//         console.log(userInfo['password']);
        
//         const Matched = await bcryptjs.compare(password,userInfo['password']);
//         console.log('Matched',Matched);
//         if(!Matched)
//         {
//             return res.send({Msg : 'Invalid credential'});
//         }
//         else if(Matched == true)
//         {
//             const secret = "ASDFGHJKL";
//             const token = jwt.sign({id:userInfo._id},secret,{expiresIn:'1d'});
//             let updateToken = await UserModel.findByIdAndUpdate(
//                 {_id : userInfo._id},
//                 {
//                     $set : {
//                         token : token
//                     }
//                 },
//                 {new : true}
//             ).exec();

//             return res.send(updateToken);
//         }

//        }
//        else
//        {
//          return res.send({Msg : 'You are not registered with us !'});
//        }
//     }

//     catch(err)
//     {
//         console.error(err);
//         return res.send(err);
//     }
// }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              