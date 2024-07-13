import fetch from 'node-fetch';
import * as fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path';


// Derive the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_API_URL = 'https://pixtinfinity.pythonanywhere.com/api';

const TAG_API_URL = `${BLOG_API_URL}/tag`

const renderBlogPosts = async (req, res, viewTemplate) => {
    const page = req.query.page || 1; // Get the page number from the query parameters, default to 1 if not provided
    try {
      const response = await fetch(`${BLOG_API_URL}/post?page=${page}`);
      const data = await response.json();

      const [postsResponse, tagsResponse] = await Promise.all([
        fetch(`${BLOG_API_URL}/post?page=${page}`),
        fetch(`${TAG_API_URL}`)
      ]);
  
      const postsData = await postsResponse.json();
      const tagsData = await tagsResponse.json();
  
      const tags = tagsData.results;

      const blogs = postsData.results;
      const next = postsData.next;
      const previous = postsData.previous;
      res.render(viewTemplate, { tags, blogs, next, previous, currentPage: page });
    } catch (error) {
      console.error('Error fetching blog data:', error);
      res.status(500).send('Error fetching blog data');
    }
  };
export const renderIndex = (req, res) => renderBlogPosts(req, res, 'index');
export const renderBlog = (req, res) => renderBlogPosts(req, res, 'blog');
