import { Router } from "express";
import {getBlogPosts} from '../controllers/blogController.js'
const router = Router()

// Home Route
router.get('/', getBlogPosts);

export default router;