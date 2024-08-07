import { Router } from "express";
import {getBlogPosts, searchBlogPost} from '../controllers/blogController.js'
import {renderAbout, subscribeNewsLetter, renderSitemap, renderContact, renderPrivacyPolicy, renderAdsTxt, renderRobotTxt} from '../controllers/rootController.js'
const router = Router()

// Home Route
router.get('/', getBlogPosts);
router.get('/search', searchBlogPost);
router.get('/about', renderAbout);
router.get('/contact', renderContact);
router.get('/privacy-policy', renderPrivacyPolicy);
router.get('/ads.txt', renderAdsTxt);
router.get('/robots.txt', renderRobotTxt);
router.get('/sitemap(.xml)?', renderSitemap);

router.route('/news-letter')
    .post(subscribeNewsLetter);


export default router;