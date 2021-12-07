import { Router } from "express";
import { otpSend, otpVerification, signup } from "../../Controller/User/user.controller";
const router: Router = Router();

router.post('/otpSend', otpSend);
router.post('/otpVerification', otpVerification);
router.post('/signup', signup)
// router.post('/login',login);

export default router;