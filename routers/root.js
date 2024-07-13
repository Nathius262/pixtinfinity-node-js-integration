import { Router } from "express";
import {renderIndex, renderBlog} from '../controllers/blogController.js'
const router = Router()

// Home Route
router.get('/', renderIndex);
router.get('/blog/', renderBlog);


export default router;