import { Router } from "express";
import validateToken from "./validateToken";
import { addLike, countLikesPost, deleteLikes, getLikes, getLikesCurrentUser, getPostsSeg } from "../controllers/dashboard.controller";

const router = Router();


router.post('/addlike', addLike);

router.get('/postseg/:id', getPostsSeg);
router.get('/getlikes/:id', getLikes);
router.get('/getlikesuser/:id', getLikesCurrentUser);


router.get('/countLikes/:postId', countLikesPost)


router.delete('/deletelikes/:postId/:userId', deleteLikes);





export default router;