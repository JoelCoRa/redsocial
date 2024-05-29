import {Router} from 'express';
import { newUser, loginUser, resetPassword, } from '../controllers/user.controller';
import validateToken from './validateToken';

const router = Router();


router.post('/', newUser);
router.post('/login', loginUser);

// router.post('/regorg', newOrganizacion);
// router.post('/loginorg', loginOrganizacion);




router.post('/resetpassword', resetPassword);






// router.post('/req-reset-password', reqRecoverPassword);
// router.post('/reset-password', recoverPassword);
// router.get('/getuser', getUser);


export default router;


