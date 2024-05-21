import {Router} from 'express';
import { newUser, loginUser, } from '../controllers/user.controller';
import validateToken from './validateToken';

const router = Router();


router.post('/', newUser);
router.post('/login', loginUser);


// router.post('/req-reset-password', reqRecoverPassword);
// router.post('/reset-password', recoverPassword);
// router.get('/getuser', getUser);


export default router;


