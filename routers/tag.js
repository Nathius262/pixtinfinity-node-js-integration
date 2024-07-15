import express from 'express'
const router = express.Router();
import getTagPostsPage from '../controllers/tagController.js';


// Blog Details Route
router.get('/:id', getTagPostsPage);

export default router