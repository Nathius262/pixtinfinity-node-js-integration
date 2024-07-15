import { Router } from "express";
import {getBlogPosts} from '../controllers/blogController.js'
import {renderAbout, renderContact, renderPrivacyPolicy, renderAdsTxt, renderRobotTxt} from '../controllers/rootController.js'
const router = Router()

// Home Route
router.get('/', getBlogPosts);
router.get('/about', renderAbout);
router.get('/contact', renderContact);
router.get('/privacy-policy', renderPrivacyPolicy);
router.get('/ads.txt', renderAdsTxt);
router.get('/robots.txt', renderRobotTxt);

export default router;