import express from 'express'
const router = express.Router();
import { getBlogPostsPage, singleBlogPost } from '../controllers/blogController.js';


// Blog Details Route
router.get('/', getBlogPostsPage);
router.get('/:slug', singleBlogPost);


export default router