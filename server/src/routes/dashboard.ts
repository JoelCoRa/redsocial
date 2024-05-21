import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";

const router = Router();
router.get('/postseg/:id', getPostsSeg);


export default router;